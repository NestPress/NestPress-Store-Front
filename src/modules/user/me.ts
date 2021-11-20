// @ts-nocheck
import { gql, useQuery } from '@apollo/client';
import { UserState, useUser } from "store/userStore";
import { ME } from "modules/user"

export const setMe = () => {
	const user:any = useUser( state => state )
	const { loading, error, data } = useQuery(ME,{
		onCompleted(data) {
			useUser.setState({user:{
				user:{
					id:data.me.id,
					roles:[data.me.channels[0]]
				}
			}})
    	}, 
	});
}