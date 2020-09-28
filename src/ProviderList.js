import React from 'react';
import './ProviderList.css';

class ProviderList extends React.Component {


    render() {

        return (
            <div className="provider-list">
                {
                    this.props.providers.map(provider => {
                        return (
                            <button
                                onClick={() => this.props.handleSelectProvider(provider)}
                                className="provider-button"
                            >
                                {provider}
                            </button>
                        );
                    })
                }
            </div>
        );


    }

}

export default ProviderList;