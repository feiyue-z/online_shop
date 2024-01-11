import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const Detail = ({route, navigation}) => {
  const {accessToken, refreshToken, movieId} = route.params;

  const [result, setResult] = useState(null);

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  const getMovie = () => {
    fetch('http://localhost:8083/movie/' + movieId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken
      }
    })
    .then((response) => response.json())
    .then(data => {
      console.log("ohhh");
      console.log(data);
      setResult(data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getMovie();
  }, []);

  const getGenre = () => {
    let genres = "";
    result.genres.forEach((each) => {
      genres = genres + each.name + ", ";
    });
    return genres.slice(0, -2);
  };

  const getPeople = () => {
    let people = "";
    result.persons.forEach((each) => {
      people = people + each.name + ", ";
    })
    return people.slice(0, -2);
  };

  return (
    <ScrollView>
      {result &&
        <ScrollView style={styles.subContainer}>
          <Image style={styles.thumbnail}
                 source={{uri: imgBaseUrl + result.movie.posterPath}}/>
          <Text>Title: {result.movie.title}</Text>
          <Text>Year: {result.movie.year}</Text>
          <Text>Director: {result.movie.director}</Text>
          <Text>Rating: {result.movie.rating}</Text>
          <Text>Votes: {result.movie.numVotes}</Text>
          <Text>Overview: {result.movie.overview}</Text>
          <Text>Genre: {getGenre()}</Text>
          <Text>People: {getPeople()}</Text>
        </ScrollView>
      }
    </ScrollView>
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
    margin: 10,
  },
  thumbnail: {
    width: 200,
    height: 300,
    margin: 10,
  }
});

export default Detail;
