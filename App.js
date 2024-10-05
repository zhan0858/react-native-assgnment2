import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UserAvatar from 'react-native-user-avatar';
import { Platform, StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FAB from './components/FAB';


export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    setRefreshing(true);
    let url = "https://random-data-api.com/api/v3/projects/265f8441-dbb3-419c-a375-9dc4e4cb1c1e?api_key=iAlJDBHolm8DzSlYeeaGoQ";
    try {
      const response = await axios.get(url);
      setUserList(userList => [...response.data.data, ...userList]);
      console.log('Data fetched =', userList.length);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      if (error.response && error.response.status === 429) {
        console.log('Rate limit exceeded. Retrying in 1 minute...');
        setTimeout(fetchData, 60000);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);


  const renderItem = ({ item, index }) => {
    const isLastItem = index === userList.length - 1;
    return (
      <View style={[styles.card, isLastItem && styles.lastCard]}>
        <View >
          <UserAvatar size={50} name={item.first_name} src={item.avatar} />
        </View>
        <View style={styles.info}>
          <Text style={{ ...styles.right, ...styles.name }}>{item.first_name}</Text>
          <Text style={styles.right}>{item.last_name}</Text>
          <Text style={styles.right}>{item.job_title}</Text>
        </View>
      </View>
    );
  }

  const handleAddTen = () => {
    fetchData();
  }

  return (
    <SafeAreaProvider style={styles.StyleSheet}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to the User List 😃</Text>
        </View>
        <FlatList
          style={styles.list}
          data={userList}
          keyExtractor={(item) => item.uuid}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <FAB onPress={handleAddTen} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: 50,
    padding: 16
  },
  title: {
    fontWeight: 'bold',
  },
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#C4D7FF',
    ...Platform.select({
      ios: {
        flexDirection: 'row-reverse'
      },
      android: {
        flexDirection: 'row'
      }
    }),
    default: {
      width: '100%',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#638'
    }
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  list: {
    paddingBottom: 32,
    marginBottom: 32,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        justifyContent: 'start',
        textAlign: 'left'
      },
      android: {
        justifyContent: 'end',
        textAlign: 'right'
      }
    }),
  },
  name: {
    fontWeight: 'bold',
  },
  right: {
    ...Platform.select({
      ios: {
        textAlign: 'left'
      },
      android: {
        textAlign: 'right'
      },
      default: {
        textAlign: 'left'
      }
    })
  }
});
