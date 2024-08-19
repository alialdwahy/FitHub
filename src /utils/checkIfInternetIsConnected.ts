import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function checkIfInternetIsConnected() {

    return new Promise((resolve) => {
        NetInfo.fetch()
            .then(async (state : NetInfoState) => {
            if (state.isConnected) {
              return resolve(true);
            } else {
              console.log('Connection type', state.type);
            }
          })
          .catch(err => {
            return resolve(false);
          });
          
    })

}