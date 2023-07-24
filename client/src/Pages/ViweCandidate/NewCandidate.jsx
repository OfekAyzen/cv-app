import {useEffect, useState} from "react";


export default function NewCandidate() {
    const [ID, setID] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");


    const [posts, setPosts] = useState(() => {
        const localValue = localStorage.getItem("Candidates");
        if (localValue == null) return [];

        return JSON.parse(localValue);
    });

    useEffect(() => {
        console.log("Posts has changed");
        localStorage.setItem("Candidates", JSON.stringify(posts));
    }, [posts]);

    const handleIDChange = (e) => {
        setID(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    function generateUniqueId() {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000);
        return parseInt(`${timestamp}${randomNum}`);
    }

    function addCandidate(ID, Name, Email, Phone) {
        setPosts((currentPosts) => {
            return [
                {
                    ID: ID,
                    Name: Name,
                    Email: Email,
                    Phone: Phone,
                },
                ...currentPosts,
            ];
        });
    }

    const handleCandidate = () => {
        addCandidate(ID, Name, Email, Phone);
        alert("Your Candidate have been published successfully!");
    };

    return (
        <main>
            <h1>Add Candidate</h1>
            <div>
                <label htmlFor="ID">ID:</label>
                <input
                    type="text"
                    id="ID"
                    value={ID}
                    onChange={handleIDChange}
                />
            </div>
            <div>
                <label htmlFor="Name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    value={Name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <label htmlFor="Email">Email:</label>
                <input
                    type="text"
                    id="Email"
                    value={Email}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <label htmlFor="Phone">Phone:</label>
                <input
                    type="text"
                    id="Phone"
                    value={Phone}
                    onChange={handlePhoneChange}
                />
            </div>
            <button onClick={handleCandidate}>Add Candidate</button>
        </main>
    );
}

