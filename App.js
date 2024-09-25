import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserAvatar from 'react-native-user-avatar';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [userList, setUserList] = useState([
    {
      "first_name": "Gretta",
      "last_name": "Spinka",
      "uuid": "66a8d35e-0ad8-440b-962c-13de1dc7cf6d",
      "avatar": "https://robohash.org/culpaperferendisquia.png?size=300x300",
      "job_title": "Central Markets Liason"
    },
    {
      "first_name": "Christian",
      "last_name": "Flatley",
      "uuid": "9e5f3b52-2ae2-4f95-ab5b-a78a90de2442",
      "avatar": "https://robohash.org/expeditasimiliquesequi.png?size=300x300",
      "job_title": "Customer Web Consultant"
    },
    {
      "first_name": "Chrystal",
      "last_name": "Terry",
      "uuid": "06a12378-ed43-4ad4-904b-f5666d17e8c0",
      "avatar": "https://robohash.org/ametofficiisquas.png?size=300x300",
      "job_title": "Investor Accounts Supervisor"
    },
    {
      "first_name": "Vanetta",
      "last_name": "Harvey",
      "uuid": "c48b7667-a5f1-4cc7-bdae-19f80d90ab12",
      "avatar": "https://robohash.org/aperspiciatisillum.png?size=300x300",
      "job_title": "Investor Optimization Engineer"
    },
    {
      "first_name": "Corrine",
      "last_name": "Mraz",
      "uuid": "c1e05a9f-f5b8-40c1-9982-afb38c72bf4d",
      "avatar": "https://robohash.org/doloremqueremsuscipit.png?size=300x300",
      "job_title": "Investor Configuration Designer"
    },
    {
      "first_name": "Melanie",
      "last_name": "Goldner",
      "uuid": "5c90bf35-8dbc-4fc5-a360-e2b699b2d972",
      "avatar": "https://robohash.org/inventoredictadolorum.png?size=300x300",
      "job_title": "Principal Marketing Strategist"
    },
    {
      "first_name": "Katlyn",
      "last_name": "Kessler",
      "uuid": "8c93be17-ebeb-4f84-aae6-4146cd64a042",
      "avatar": "https://robohash.org/autvoluptatemnon.png?size=300x300",
      "job_title": "National Implementation Producer"
    },
    {
      "first_name": "Young",
      "last_name": "Schroeder",
      "uuid": "fdf2cb32-1f2d-42ae-bdb7-b144bc145ed5",
      "avatar": "https://robohash.org/aliaseligendiblanditiis.png?size=300x300",
      "job_title": "Legacy Solutions Technician"
    },
    {
      "first_name": "Leif",
      "last_name": "Considine",
      "uuid": "bbd3bb14-d036-4290-a86d-40d2175ddab8",
      "avatar": "https://robohash.org/ipsanisiex.png?size=300x300",
      "job_title": "Customer Research Executive"
    },
    {
      "first_name": "Fanny",
      "last_name": "Oga",
      "uuid": "f0d13ff0-5ceb-4dcc-b2aa-253f653891e6",
      "avatar": "https://robohash.org/similiquefugaeos.png?size=300x300",
      "job_title": "Dynamic Identity Officer"
    }
  ]);

  useEffect(() => {
    let url = "https://random-data-api.com/api/v3/projects/265f8441-dbb3-419c-a375-9dc4e4cb1c1e?api_key=iAlJDBHolm8DzSlYeeaGoQ";
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setUserList(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log('Rate limit exceeded. Retrying in 1 minute...');
          setTimeout(fetchData, 60000);
        } else {
          console.log(error);
        }
      }
    };

    // fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
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

  const keyExtractor = (item) => item.uuid;

  return (
    <SafeAreaProvider style={styles.StyleSheet}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to the User List 😃</Text>
        </View>
        <FlatList
          style={styles.list}
          data={userList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  list: {
    paddingBottom: 32,
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
  },
});
