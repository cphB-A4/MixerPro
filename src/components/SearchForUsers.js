import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import DisplayUsersInTable from "./DisplayUsersInTable";
import ErrorToDisplay from "./ErrorToDisplay";
import UserProfile from "./UserProfile";

function SearchForUsers() {
    const [userSelection, setUserSelection] = useState('')
    const [users, setUsers] = useState('')
    const [noUsersFound, setNoUsersFound] = useState(false)
    const [error, setError] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const [userToBeDisplayed, setUserToBeDisplayed] = useState('');
  const handleOnChange = (evt) => {
    evt.preventDefault();
    setUserSelection(evt.target.value);
    //prevents making api call on empty input
    if (evt.target.value.length < 1) {
        setUsers('')
        setNoUsersFound(false)
      return;
    }
    //facade.searchForUsers...
    facade
      .getUsernameBySearching(evt.target.value)
      .then((res) => {
      //  console.log(res);
        setError('')
        setUsers(res);
        setNoUsersFound(false)
if(res.length === 0){
setNoUsersFound(true); //User gets notifed that no users where found 
setError('')
}
      })
      .catch((err) => {
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
           // setSuccess(false);
            setError('Connection error. Contact IT');
          });
        } else {
          //setSuccess(false);
          setError("Network Error. Contact IT");
          console.log("Network error");
        }
      });
  };

  //This fires everytime a username(selectedUser) is clicked on
  useEffect(() => {

    //setUserToBeDisplayed
    if(selectedUser === ""){
        return;
    }
     facade
       .getUserInfo(selectedUser)
       .then((res) => {
         console.log(res);
         setSelectedUser('')
         setUserToBeDisplayed(res);
       })
       .catch((err) => {
         console.log(err);
         if (err.status) {
           err.fullError.then((e) => {
             console.log(e.code + ": " + e.message);
             // setSuccess(false);
             setError("Connection error. Contact IT");
           });
         } else {
           //setSuccess(false);
           setError("Network Error. Contact IT");
           console.log("Network error");
         }
       });

  }, [selectedUser]);


  return (
    <div>
      <h1 className="text-center mt-3">Search for users</h1>
      <p>
        Check out what other people are sharing on their accounts and be
        inspired!
      </p>

      <input
        onChange={handleOnChange}
        className="form-control"
        placeholder="Search for a user..."
        value={userSelection}
      />

      {users !== "" ? (
        <DisplayUsersInTable
          setUsers={setUsers}
          setUserState={setSelectedUser}
          userList={users}
        />
      ) : (
        ""
      )}
      {noUsersFound && <p>No users found... </p>}
      {error && <ErrorToDisplay errorMsg={error} />}
      {userToBeDisplayed !== "" ? <UserProfile user={userToBeDisplayed} /> : ""}
    </div>
  );
}

export default SearchForUsers;
