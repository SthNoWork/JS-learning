import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCYIa9lzoWmbCecIG4Emszw7n8nsJMf0xQ",
    authDomain: "learning-764c3.firebaseapp.com",
    projectId: "learning-764c3",
    appId: "1:346122253856:web:d4aa01bc8043260288ae45"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Form elements - CREATE
const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const weightInput = document.getElementById("weight");

// Form elements - UPDATE
const usernameUpdateInput = document.getElementById("usernameUpdate");
const ageUpdateInput = document.getElementById("ageUpdate");
const weightUpdateInput = document.getElementById("weightUpdate");

// Common elements
const feedbackElement = document.getElementById("feedback");
const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authStatusElement = document.getElementById("authStatus");

let currentUser = null;

// ============================================
// CREATE - Add new data to Firestore
// ============================================
async function createUser() {
    if (!requireAuth()) {
        return;
    }

    if (!validateInputs()) {
        feedbackElement.textContent = "error";
        return;
    }

    try {
        await setDoc(getUserDocRef(), {
            username: usernameInput.value,
            age: ageInput.value,
            weight: weightInput.value
        });

        feedbackElement.textContent = "done";
        clearForm();
    } catch (error) {
        feedbackElement.textContent = `error: ${error.message}`;
    }
}

// ============================================
// READ - Get data from Firestore
// ============================================
async function readUser() {
    if (!requireAuth()) {
        return;
    }

    try {
        const userRef = getUserDocRef();
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();
            console.log("User data:", data);
            feedbackElement.textContent = `Read: ${data.username}, ${data.age}, ${data.weight}`;
        } else {
            feedbackElement.textContent = "No user found";
        }
    } catch (error) {
        feedbackElement.textContent = `error: ${error.message}`;
    }
}

// ============================================
// UPDATE - Modify existing data in Firestore
// ============================================
async function updateUser() {
    if (!requireAuth()) {
        return;
    }

    if (!validateUpdateInputs()) {
        feedbackElement.textContent = "error";
        return;
    }

    try {
        await updateDoc(getUserDocRef(), {
            username: usernameUpdateInput.value,
            age: ageUpdateInput.value,
            weight: weightUpdateInput.value
        });

        feedbackElement.textContent = "updated";
        clearUpdateForm();
    } catch (error) {
        feedbackElement.textContent = `error: ${error.message}`;
    }
}

// ============================================
// DELETE - Remove data from Firestore
// ============================================
async function deleteUser() {
    if (!requireAuth()) {
        return;
    }

    try {
        await deleteDoc(getUserDocRef());
        feedbackElement.textContent = "deleted";
        clearForm();
        clearUpdateForm();
    } catch (error) {
        feedbackElement.textContent = `error: ${error.message}`;
    }
}

// ============================================
// AUTH - Google Sign-In / Sign-Out
// ============================================
async function loginWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
        feedbackElement.textContent = "signed in";
    } catch (error) {
        feedbackElement.textContent = `error: ${error.message}`;
    }
}

async function logoutUser() {
    try {
        await signOut(auth);
        feedbackElement.textContent = "signed out";
    } catch (error) {
        feedbackElement.textContent = `error: ${error.message}`;
    }
}

onAuthStateChanged(auth, (user) => {
    currentUser = user;

    if (user) {
        authStatusElement.textContent = `Signed in as: ${user.email}`;
        setCrudEnabled(true);
    } else {
        authStatusElement.textContent = "Not signed in";
        setCrudEnabled(false);
    }
});

// ============================================
// HELPER FUNCTIONS
// ============================================
function validateInputs() {
    return usernameInput.value.trim() !== "" &&
        ageInput.value.trim() !== "" &&
        weightInput.value.trim() !== "";
}

function validateUpdateInputs() {
    return usernameUpdateInput.value.trim() !== "" &&
        ageUpdateInput.value.trim() !== "" &&
        weightUpdateInput.value.trim() !== "";
}

function clearForm() {
    usernameInput.value = "";
    ageInput.value = "";
    weightInput.value = "";
}

function clearUpdateForm() {
    usernameUpdateInput.value = "";
    ageUpdateInput.value = "";
    weightUpdateInput.value = "";
}

function getUserDocRef() {
    return doc(db, "users", currentUser.uid);
}

function requireAuth() {
    if (!currentUser) {
        feedbackElement.textContent = "Please sign in first";
        return false;
    }

    return true;
}

function setCrudEnabled(isEnabled) {
    createBtn.disabled = !isEnabled;
    readBtn.disabled = !isEnabled;
    updateBtn.disabled = !isEnabled;
    deleteBtn.disabled = !isEnabled;

    usernameInput.disabled = !isEnabled;
    ageInput.disabled = !isEnabled;
    weightInput.disabled = !isEnabled;

    usernameUpdateInput.disabled = !isEnabled;
    ageUpdateInput.disabled = !isEnabled;
    weightUpdateInput.disabled = !isEnabled;

    loginBtn.disabled = isEnabled;
    logoutBtn.disabled = !isEnabled;
}

// Event listeners
createBtn.addEventListener("click", createUser);
readBtn.addEventListener("click", readUser);
updateBtn.addEventListener("click", updateUser);
deleteBtn.addEventListener("click", deleteUser);
loginBtn.addEventListener("click", loginWithGoogle);
logoutBtn.addEventListener("click", logoutUser);

