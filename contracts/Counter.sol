pragma solidity ^0.8.0;

contract Counter {
    // Contract code goes here...

    //Store a numerical Value
    //Increase the count
    /*
    Decrease the count
    Store a name / set name

    CRUD -??? CRUD app i guess?? - My own Comment
        So a CRUD app is an app that allows a user to interact with the app and then
        the website can store the information into the back end database through the
        server

        Blockchain allows people to interact with the website (Front End) through
        a blockchain browser using their wallet. Then the smart contract
        will interact with the Back End which are the Nodes

    */
    
    uint public count; // uint is 1, while int can be 1 or -1
    //public is a modifier that allows the var to be read out the function (i.e. Counter function)
    string public name;
    

    constructor(string memory _name, uint _initialCount) { //Initializes the contract with values when it's compiled
        name = _name; //use to have a set value but now value is set with constructor
        count = _initialCount; //Same as above
        //the naming convention is optional (ex. name & _name)
        
        //variable default to local so they're only read
        //in the function.
    }

    function increment() public returns(uint newCount) {
        //count = count + 1; this is old version
        count ++; //another way to increment in solidity
        
        //reads the count > adds 1 > sets as new value

        //can set functions with modifiers too

        //public allows the function to be read out the contract
        return count;
    }

    function decrement() public returns(uint newCount) {
        count --;
        return count;
    }

    function getCount() public view returns(uint) {
        //view is a modifier for function to read blockchain only
        return count;
    }

    function getName() public view returns(string memory currentName) {
        return name;
    }

    function setName(string memory _newName) public returns(string memory newName) {
        name=_newName;
        return name;
    }

    
}



