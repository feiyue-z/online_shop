import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, TouchableHighlight, Image, TextInput, Button } from "react-native";

const divider = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",
      }}
    />
  );
}

let posts = [];

const addPost = (id, title, posterPath) => {
  posts.push({id: id, title: title, posterPath: posterPath});
};

const Search = ({route, navigation}) => {
  const {accessToken, refreshToken} = route.params;

  const [changed, setChanged] = useState(false);

  const [title, onChangeTitle] = useState(null);
  const [year, onChangeYear] = useState(null);
  const [director, onChangeDirector] = useState(null);
  const [genre, onChangeGenre] = useState(null);
  const [page, setPage] = useState(1);

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  const getPosts = async () => {
    await fetch('http://localhost:8083/movie/search?page='+ page
      + '&title=' + title
      + '&year' + year
      + '&director' + director
      + '&genre' + genre,
      {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken
      }
    })
    .then((response) => response.json())
    .then(data => {
      posts = [];
      for (const each of data.movies) {
        addPost(each.id, each.title, each.posterPath);
      }
      setChanged(!changed);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            // alert("Key: " + item.key + "\nValue: " + item.value);
            navigation.navigate("Detail", {accessToken: accessToken, refreshToken: refreshToken, movieId: item.id});
          }}
          underlayColor="white">
          <View style={styles.subContainer} flexDirection='row'>
            <Image style={styles.thumbnail}
                   source={{uri: imgBaseUrl + item.posterPath}}/>
            <Text style={{fontSize: 22, margin: 10}}>
              {item.title}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  useEffect(() => {
    if (posts && posts.length > 0) {
      getPosts();
    }
  }, [page]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        placeholder="Title"
        value={title}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeYear}
        placeholder="Year"
        value={year}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeDirector}
        placeholder="Director"
        value={director}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeGenre}
        placeholder="Genre"
        value={genre}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => getPosts()}
          title="GO"
        />
        <Button
          onPress={() => setPage(page - 1 == 0 ? 1 : page - 1)}
          title="PREV"
        />
        <Button
          onPress={() => setPage(page + 1)}
          title="NEXT"
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={posts}
          extraData={changed}
          renderItem={renderItem}
          ItemSeparatorComponent={divider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
  },
  buttonContainer: {
    margin: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  thumbnail: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default Search;
