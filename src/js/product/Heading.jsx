import React, { useContext } from 'react';
import { exampleContext } from './ExampleContext.js';

export default function Heading(){
    const example = useContext(exampleContext);
    return (
        <div>
            <p>{example.c}</p>
        </div>
    )
}