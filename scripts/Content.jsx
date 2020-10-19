import * as React from 'react';
import ScrollableFeed from 'react-scrollable-feed'


import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('addresses received', updateAddresses);
            return () => {
                Socket.off('addresses received', updateAddresses);
            }
        });
    }
    
    function updateAddresses(data) {
        console.log("Received addresses from server: " + data['allAddresses']);
        setAddresses(data['allAddresses']);
    }
    
    getNewAddresses();

    return (
        <div>
            <h1>USPS Addresses!</h1>
            <ScrollableFeed state={addresses}>
                <ol>
                    {
                    // TODO -- display all addresses
                        addresses.map(
                            (address, index) => <li key={index}>{address}</li>)
                    }
                </ol>
            </ScrollableFeed>
            <Button />
        </div>
    );
}
