<?php //this file serves as a backend, we'll do our main database work here

session_start(); 
$loggedIn = $_SESSION['loggedin'] ;

if(($loggedIn == true && password_verify($_SERVER['REMOTE_ADDR'].$username, $_COOKIE["extrakey"]))){                 //do some security checks
    header("Location: ./login.php"); 
    die("User isn't logged in.");
}else{
    
    function listEntries($connection){
        $queryStatement = "select * from Clients";
        $result = $connection->query($queryStatement);
        $clientlist = [];
        $clientListIndexed = array();
        if ($result->num_rows > 0) {
            // collect data into an array
            while($clients = $result->fetch_assoc()) {
                array_push($clientlist, $clients);
            }
        }
        foreach ($clientlist as $clientdata){
            $clientListIndexed[$clientdata["ID"]] = $clientdata;
        }
            
        return($clientListIndexed);
    }
    
    $servername = "localhost";
    $sqlusername = "demouser";
    $sqlpassword = "Passw0rd";
    $dbname = "demoapp";
    
    $conn = new mysqli($servername, $sqlusername, $sqlpassword, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }  

    if($_GET["fn"] == "list"){
        echo json_encode(listEntries($conn));  //output json
    }
    if($_GET["fn"] == "update"){
        echo json_encode(listEntries($conn));
    }

    $conn->close();
    
}
