import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Button, ChakraProvider, Stack } from "@chakra-ui/react";
import { ShoppingTrip } from "./ShoppingTrip";

function App() {
  return (
    <ChakraProvider>
      <main className="App">
        <Router>
          <Switch>
          <Route path="/trip">
              <ShoppingTrip />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>

          </Switch>
        </Router>
      </main>
    </ChakraProvider>
  );
}

function Homepage() {
  return (
    <>
      <div>What do you want to do</div>
      <Stack maxWidth="400px" marginX="auto">
         <Button as={Link} to={"/trip"}>new shopping trip</Button>
        <Button onClick={() => alert("sorry, not implemented yet")}>
          something else
        </Button>
      </Stack>
    </>
  );
}

export default App;
