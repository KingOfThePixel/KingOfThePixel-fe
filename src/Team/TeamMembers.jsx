import React from 'react';
import { Link } from "react-router-dom";
import { Card, Image, Icon } from 'semantic-ui-react';

import RichanyProfileImage from './ProfileImages/Richany Alina Nguon.jpeg';
import TommyProfileImage from './ProfileImages/Tommy Coleman.jpeg';
import RoyProfileImage from './ProfileImages/Roy Wakumelo Jr.png';

import '../App.css';
 
const TeamMembers = () => {
  return (
    <div className='TeamMembersList' >
        <h1 className='team-page-title '> Meet The Team </h1>
        <div className='team-members-container'>
            <span className='team-member-profile'>
                <Card>
                    <Image src={RichanyProfileImage} wrapped ui={false} alt='profile'/>
                    <Card.Content>
                        <Card.Header textAlign='center' >Richany Alina Nguon</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to='#'>
                            <Icon size='large' name='github' />
                        </Link>
                        <Link to='#'>
                            <Icon size='large' name='linkedin' />
                        </Link>
                        <Link to='#'>
                            <Icon size='large' name='globe' />
                        </Link>
                    </Card.Content>
                </Card> 
            </span>
        
            <span className='team-member-profile'>
                <Card>
                    <Image src={TommyProfileImage} wrapped ui={false} alt='profile'/>
                    <Card.Content>
                        <Card.Header textAlign='center' >Tommy Coleman</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to='#'>
                            <Icon size='large' name='github' />
                        </Link>
                        <Link to='#'>
                            <Icon size='large' name='linkedin' />
                        </Link>
                        <Link to='#'>
                            <Icon size='large' name='globe' />
                        </Link>
                    </Card.Content>
                </Card> 
            </span>
                
            <span className='team-member-profile'>
                <Card>
                    <Image src={RoyProfileImage} wrapped ui={false} alt='profile'/>
                    <Card.Content>
                        <Card.Header textAlign='center' >Roy Wakumelo Jr</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to='#'>
                            <Icon size='large' name='github' />
                        </Link>
                        <Link to='#'>
                            <Icon size='large' name='linkedin' />
                        </Link>
                        <Link to='#'>
                            <Icon size='large' name='globe' />
                        </Link>
                    </Card.Content>
                </Card> 
            </span> 
        </div>

    </div>
  );
}

export default TeamMembers;
