import React, { useState } from 'react';
import { db } from '../data/database.js';
import { collection, addDoc } from 'firebase/firestore';

const AdminConsole = () => {


    return (
        <div className="admin-console-wrapper">
            <button className="blue-btn">Lägg till ny product</button>
            <button className="blue-btn">Redigera</button>
            <button className="blue-btn">Ta bort</button>
        </div>

    )
}

export default AdminConsole;