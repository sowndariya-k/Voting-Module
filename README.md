# Secure Voting Module

## 📌 Overview
The **Voting Module** is the frontend interface used at polling stations. It allows verified voters to cast their votes securely. The system is designed to run in a kiosk mode (fullscreen, restricted inputs) and interacts dynamically with the backend to process voters in a queue.

---

## ⚙️ Module Workflow

### 1. Station Initialization
*   **Auto-Allocation**: When the application loads, it connects to the Firebase Realtime Database.
*   It searches for an available station (e.g., `station1`, `station2`) marked as `inactive`.
*   It locks the station by setting its session to `active` and starts a heartbeat to maintain the connection.

### 2. Voter Identification (Queue System)
*   **Listening Mode**: The station listens for new Voter IDs added to its specific node in Firebase (`stations/{stationId}/currentVoterIds`).
*   *Note: This ID is typically pushed by the Voter Card Scanner module.*
*   **Fetching Details**: Once a Voter ID is received:
    *   The system fetches the voter's name and details from Firestore (`Voter details` collection).
    *   It displays the voter's name on the screen for confirmation.
    *   The voting interface is enabled.

### 3. Voting Process
*   **Candidate Selection**: The voter selects a candidate from the list (fetched dynamically from Firestore).
*   **Submission**:
    1.  **Salt Generation**: A random cryptographic salt is generated.
    2.  **Hashing**: The system creates a string: `voterId|candidateId|salt|timestamp` and calculates its **SHA-256 Hash**.
    3.  **Encryption**: The hash is encrypted using the **RSA Public Key** (`public_key_spki.b64`).
    4.  **Storage**:
        *   **Firestore**: Stores the `encryptedHash` in the `vote_details` collection.
        *   **Realtime DB**: Pushes the raw components (salt, timestamp, candidateId) to `blockchain_votes` for the blockchain verification node to pick up.
    5.  **Confirmation**: The voter's record is updated to `hasVoted: true`.
    6.  **Feedback**: A beep sound plays, and the UI resets after a 30-second delay for privacy.

### 4. Station Deactivation
*   The station can be manually deactivated using the "Deactivate Station" button.
*   This requires a secure PIN (Default: `771987`) to prevent unauthorized shutdown.

---

## 🛡 Security Features
*   **Client-Side Encryption**: Votes are encrypted before leaving the browser using RSA-OAEP.
*   **Kiosk Mode Enforcement**:
    *   Right-click disabled.
    *   Keyboard shortcuts (F12, Ctrl+Shift+I, etc.) blocked.
    *   Auto-fullscreen on interaction.
*   **Session Management**: Heartbeat mechanism ensures stations are released if the connection is lost.

---

## 📂 File Structure
*   **`index.html`**: The main voting interface.
*   **`js/app.js`**: Core logic for station management, voting, and Firebase interaction.
*   **`js/security.js`**: Scripts to lock down the browser UI.
*   **`public_key_spki.b64`**: The RSA Public Key used for encrypting votes.
*   **`beep.mp3`**: Audio feedback for successful votes.

## 🚀 How to Run
1.  Ensure you have a local server (e.g., Live Server in VS Code).
2.  Open `index.html` in the browser.
3.  The system will automatically attempt to allocate a station.
4.  **Simulation**: If no scanner is connected, you can manually add a Voter ID string to the `currentVoterIds` node of the active station in the Firebase Console to trigger the voting flow.