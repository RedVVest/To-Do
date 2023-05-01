import React from 'react';

const centerComponent = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    }
}

export default centerComponent;