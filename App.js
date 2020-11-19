import React,{useEffect} from 'react';
import { 
  StatusBar, 
  Animated, 
  Text, 
  Image, 
  View, 
  StyleSheet, 
  Dimensions,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
const {width, height} = Dimensions.get('screen');
const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']

const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571747.png"
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571680.png"
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571603.png"
  }
]

    const Indicator = ({scrollX}) =>{
    
      return(
        <View style={{position:'absolute', bottom:50, flexDirection:"row"}}>
          {DATA.map((_,i) =>{
            const inputRange  = [(i -1) * width , i*width, (i+1) * width];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange:[0.8,1.4,0.8],
                extrapolate:'clamp'
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange:[0.6,.9,0.6],
                extrapolate:'clamp'
              });


            return(
              <Animated.View
                key={`indicator-${i}`}
                style={{
                height:10,
                width:10,
                opacity,
                borderRadius:5,
                margin:10,
                backgroundColor:"#fff",
                transform:[
                  {
                    scale 
                  }
                ]
              }}
              >
              </Animated.View>  
            )
          })}
        </View>
      )
    }

    const Backdrop = ({ scrollX }) =>{
      const backgroundcolor = scrollX.interpolate({
        inputRange:bgs.map((_,i) => i * width),
        outputRange:bgs.map((bg) => bg),
      });
      return( 
        <Animated.View 
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor:backgroundcolor
            }
          ]}
        />
      )  
    }

    const Square = ({scrollX}) =>{
      const YOLO = Animated.modulo(
            Animated.divide( 
              Animated.modulo(scrollX, width), 
              new Animated.Value(width)),
            1);
      
      const  rotate = YOLO.interpolate({
        inputRange:[0, .5, 1],
        outputRange:['-35deg', '0deg', '-35deg']
      })   
      
      const  translateX = YOLO.interpolate({
        inputRange:[0, .5, 1],
        outputRange:[0, -height, 0]
      })      
      return(
        <Animated.View
            style={{
              width:height,
              height:height,
              top: -height *.65,
              left:-height * 0.20,
              backgroundColor:'#fff', 
              borderRadius:56, 
              position:'absolute',
              transform:[
                {
                  rotate
                },
                {
                  translateX,
                }
              ]
        }}
        >

        </Animated.View>
      )
    }
export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  useEffect(() =>{
    SplashScreen.hide();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList 
          data={DATA}
          horizontal
          scrollEventThrottle={32}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{x:scrollX}}}],
            {useNativeDriver:false}
            )}
          contentContainerStyle={{marginBottom:100}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.key}
          renderItem={({item}) =>{
            return(
              <View style={{width, alignItems:'center', padding:20,}}>
                <View style={{flex:.7, justifyContent:"center"}}>
                  <Image
                    source={{uri:item.image}}
                    style={{
                      width:width/2,
                      height:height/2,
                      resizeMode:"contain"
                    }}
                  />  
                </View>
                <View style={{flex:.3,}}>
                  <Text style={{fontWeight:"800",color:'#fff', fontSize:28, marginBottom:10,}}>
                    {item.title}
                  </Text>
                  <Text style={{fontWeight:"300" , color:'#fff', fontSize:16,}}>
                    {item.description}
                  </Text>
                </View>
              </View>  
            )
          }}
      />
      <Indicator scrollX={scrollX}>

      </Indicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
