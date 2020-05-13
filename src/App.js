import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  //Listando os projetos da API através do useEffect
  useEffect(() => {
    api.get('repositories').then(response => {      
      setRepositories(response.data);
    });
  }, []);


  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />      

      <SafeAreaView style={styles.container}>
      {/* Começo FlatList */}
      <FlatList
        style={styles.repositoryContainer}
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={( { item : repository }) => (
              <View>
                <Text style={styles.repository}>{repository.title}</Text>
                <View style={styles.techsContainer}>
                  {repositories.map(repository =>                  
                    <Text key={repository.id} style={styles.tech}>{repository.techs}</Text> )}                    
                </View>

                <View style={styles.likesContainer}>
                  <Text style={styles.likeText}>{repository.likes}</Text>
                </View>

                    {/* --Botão de curtidas-- */}                    
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleLikeRepository(1)}
                      // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                      testID={`like-button-${repository.id}`}
                    >
                      <Text style={styles.buttonText}>Curtir</Text>
                    </TouchableOpacity>
                    {/* -- FIM Botão de curtidas-- */}       
              </View>
              
            )}
      />
      {/* Fim Flatlist */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
