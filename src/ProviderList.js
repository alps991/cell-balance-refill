import React from 'react';
import './ProviderList.css';

const ProviderList = (props) => (
    <div className="provider-list">
        {
            props.providers.map(provider => {
                return (
                    <button
                        onClick={() => props.handleSelectProvider(provider)}
                        className="provider-button"
                        key={provider}
                    >
                        {provider}
                    </button>
                );
            })
        }
    </div>
);


export default ProviderList;