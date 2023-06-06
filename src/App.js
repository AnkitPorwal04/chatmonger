import { useEffect, useRef, useState } from "react";
import {Box, Button, Container, HStack, Input, VStack} from "@chakra-ui/react"
import Message from "./Components/Message";
import {app} from "./firebase"
import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import {getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore"
import Header from "./Components/Header";

const auth = getAuth(app);

const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
};

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);

  const logoutHandler = () => signOut(auth)

  const submithandler = async(e) =>{
    e.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db, "Messages"),{
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      });

      divForScroll.current.scrollIntoView({ behaviour: "smooth" })
    } catch (error) {
      alert(error)
    }
  };

  useEffect(()=>{
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    }, []);

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return {id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);

  return (
    <Box bg={"red.50"}>
            <Header />

      {
        user?(
          <Container h={"95vh"} bg={"white"}>
            <VStack py={"4"} h={"full"}>
             <Button onClick={logoutHandler} w={"full"} colorScheme="red">Logout</Button>

              <VStack
                overflowY={"auto"} 
                h={"full"} 
                w={"full"} 
                css={{
                  "&:: -webkit-scrollbar":{
                    display: "none"
                  }
                }}
              >
                {
                  messages.map(item => (
                    <Message 
                      key={item.id} 
                      user={item.uid === user.uid ? "me" : "other"} 
                      text={item.text} 
                      uri={item.uri} 
                    />
                  ))
                }

                <div ref={divForScroll}></div>
              </VStack>

              <form onSubmit={submithandler} style={{width: "100%"}}>

                <HStack>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message" />
                  <Button type="submit" colorScheme="purple">send</Button>
                </HStack>
              </form>

            </VStack>
          </Container>
        ):(
        <VStack height={"100vh"} justifyContent={"center"} bg={"white"}>
          <Button onClick={loginHandler} colorScheme="purple">Sign in with Google</Button>
        </VStack>
      )}
    </Box>
  );
};

export default App;
