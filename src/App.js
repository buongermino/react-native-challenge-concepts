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
    const response = await api.post(`repositories/${ id }/like`);
    
    likedRepository = response.data;

    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id) {
        return likedRepository;
      }
      else {
        return repository;
      }
    });
    setRepositories(repositoriesUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f1717" />      

      <SafeAreaView style={styles.container}>
      {/* Começo FlatList */}
      <FlatList
        // style={styles.repositoryContainer}
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={( { item : repository }) => (
          <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>

            
            <View style={styles.techsContainer}>            
            {repository.techs.map(tech => { 
              return (    //pra cada elemento no array, retorna um texto com o nome da tech                         
                <Text key={tech} style={styles.tech}>{tech}</Text>
                )}
            )}
            </View>                                 
                
                {/* --Curtidas-- */}      
                <View style={styles.likesContainer}>
                  <Text 
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}                  
                  >
                    {repository.likes} curtida{repository.likes > 1 ? 's' : ''}</Text>
                </View>

                    {/* --Botão de curtidas-- */}                    
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleLikeRepository(repository.id)}
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
    backgroundColor: "#0f1717",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#1a2626",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#FFF'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,    
    flexWrap: "wrap"
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 10,
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
    color: '#fff',
    marginRight: 10,
  },
  button: {
    marginTop: 10,    
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#003da3",
    padding: 15,
  },
});
