import { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import TableView from "./Table/View";
import { apiEndpoint, PAGELIMIT, DATALIMIT } from "../config";
import "./styles.css";
import Page from "./Page";

const Main = () => {
  const totalDataRef = useRef([]);
  const debounceTimeoutRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const search = (text) => {
    if (text === "") {
      setData([...totalDataRef.current]);
    } else {
      setData((prevData) =>
        prevData.filter(
          (el) =>
            el.name.toLowerCase().includes(text.toLowerCase()) ||
            el.email.toLowerCase().includes(text.toLowerCase()) ||
            el.role.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const debounceSearch = (event) => {
    let txt = event.target.value;
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      search(txt);
    }, 300);
  };

  const deleteUser = (id) => {
    totalDataRef.current = totalDataRef.current.filter((el) => el.id !== id);
    setData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const multiDelete = (id) => {
    setData((prevData) =>
      prevData.filter((el) => id.indexOf(el.id) < 0)
    );
    totalDataRef.current = totalDataRef.current.filter(
      (el) => id.indexOf(el.id) < 0
    );
  };

  const callAPI = async () => {
    let res = [];
    try {
      res = await (await fetch(apiEndpoint.URL)).json();
    } catch (err) {
      console.log(err);
    } finally {
      return res;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await callAPI();
        if (res && res.length > 0) {
          setData([...res]);
          totalDataRef.current = [...res];
        }
      } catch (err) {
        alert("Could not fetch users");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container>
      <h2 className="mb-5 mt-5" style={{ textAlign: "center" }}>ADMIN UI</h2>
      <div className="search-bar-container">
        <input
          id="search-bar"
          type="text"
          onChange={(e) => debounceSearch(e)}
          placeholder="Search Name, Email or Role's"
        />
      </div>
      {data.length > 0 ? (
        <Page
          data={data}
          pageLimit={PAGELIMIT}
          dataLimit={DATALIMIT}
          onDelete={deleteUser}
          onMultiDelete={multiDelete}
          RenderComponent={TableView}
        />
      ) : (
        <div>{loading ? "Loading..." : "No data to display"}</div>
      )}
    </Container>
  );
};

export default Main;