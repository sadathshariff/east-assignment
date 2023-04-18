import React,{useState,useEffect} from 'react';
import './App.css';
import Card from "./Components/Card"
import axios from "axios"
interface User {
  name: string;
  email: string;
}

 
function App() {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      if (response.status === 200) {
        const { name, email } = response.data.results[0];
        const user = { name: `${name.first} ${name.last}`, email };
        localStorage.setItem("user", JSON.stringify(user));
        setUserDetails(user);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setUserDetails(null);
    setLoading(true);
    setError("")
    fetchUserDetails();
  };
  return (
    <div className="App">
      <Card loading={loading} userDetails={userDetails} refresh={refresh}  error = {error}/>
      
    </div>
  );
}

export default App;
