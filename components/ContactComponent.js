import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';

class About extends Component {
    render() {
        return (
            <Card
                title="Contact Information">

                <Text style={{ margin: 10 }}>
                    121, Clear Water Bay Road<br></br>
                    Clear Water Bay, Kowloon<br></br>
                    HONG KONG<br></br>
                    Tel: +852 1234 5678<br></br>
                    Fax: +852 8765 4321<br></br>
                    Email: confusion@food.net<br></br>
                </Text>
            </Card>
        )
    }
}

export default About;