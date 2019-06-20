import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import {Form, Header, Container, List, Segment} from 'semantic-ui-react'; 
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState(["Buy Milk", "Buy Eggs", "Buy Kittens"])

  useEffect( () => {
    axios.get("/api/todos")
    .then(res => {
      setTodos(res.data)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.post("/api/todos", {name})
    .then( res => {
      setTodos([...todos, res.data, ])
      setName("")
    })
  }

  const updateTodo = (id) => {
    axios.put( `/api/todos/${id}`)
    .then( res => {
      const newTodos = todos.map(t => {
        if(t.id === id)
          return res.data 
        return t; 
      })
      setTodos(newTodos); 
    })
  }

  return (
    <Container style={{marginTop: "25px 0"}}>
      <Segment raised padded textAlign="center">
          <Header as="h3" textAlign="center" color="blue">Todo List</Header>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              required
              placeholder="Write a todo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form>
          <List>
            {todos.map((t, i) => <List.Item key={t.id} style={t.complete && styles.complete} onClick={() => updateTodo(t.id)}>{t.name}</List.Item>)}
          </List>
      </Segment>
      
    </Container>
  );
}

const styles = {
  complete: {
    textDecoration: "line-through", 
    color: "grey",
  }
}

export default App;
