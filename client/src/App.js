import React, {useState} from 'react';
import {Form, Header, Container, List, Segment} from 'semantic-ui-react'; 
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState(["Buy Milk", "Buy Eggs", "Buy Kittens"])


  const handleSubmit = (e) => {
    e.preventDefault(); 
    setTodos([...todos, name, ])
    setName("")
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
            {todos.map((t, i) => <List.Item key={i}>{t}</List.Item>)}
          </List>
      </Segment>
      
    </Container>
  );
}

export default App;
