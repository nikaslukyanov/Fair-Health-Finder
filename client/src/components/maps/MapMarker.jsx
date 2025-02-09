import React from 'react';
import {APIProvider, Map, Marker, Pin,
    InfoWindow,
    useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Modal, Box, Typography, Button, Popover} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {AdvancedMarker, AdvancedMarkerAnchorPoint} from '@vis.gl/react-google-maps';

const user_profile = {
    age: 30,
    gender: "male",
    income: 50000,
    location: "New York",
    health_profile: {"Digestive Disorders": 2, "Cardiac Conditions": 3},
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: 'text.secondary' }}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  

function MapMarkerComponent(props) {
    const [modal, setModal] = useState(false);
    const [overallScore, setOverallScore] = React.useState(50);
    const [showHospital, setShowHospital] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    const id = showHospital ? 'simple-popover' : undefined;

    var score_map = {
        "average": 50,
        "above average": 100,
        "below average": 0
    }
    
    //console.log(props.details.costs)
    
    var cost_score = 0
    var cost_tot = 0
    //var costs = []
    if (Object.keys(props.details.costs).length > 0) {
        for (const disorder of Object.keys(user_profile.health_profile)) {
            //     costs.push([disorder, props.details.costs[disorder]])
                 console.log(props.details.costs[disorder])
                // cost_score += score_map[props.details.costs[disorder][user_profile.health_profile[disorder]]["ranking"]]
                 cost_tot += 1
             }
    }
    
    cost_score = cost_tot > 0 ? cost_score / cost_tot : 0


    return (
        <React.Fragment>
            <Marker position={{lat: props.details.lat, lng: props.details.lon}} ref={markerRef}
                onClick={() => {setModal(true)}}>
            <Pin background={'#00FF00'} glyphColor={'#000'} borderColor={'#000'} />
        </Marker>
        <Modal
            open={modal}
            onClose={() => {setModal(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >

            <Box sx={{ ...style, width: "60vw", height: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.details.name}
                </Typography>
                <CircularProgressWithLabel value={overallScore} style={{width: "20vw", height: "20vw"}} />

                <Button sx={{backgroundColor:"black",padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}} aria-describedby={id} variant="contained" onClick={() => {setShowHospital(!showHospital)}}>
                    Satisfaction Rating: {props.details.satisfaction_summary_stats["Overall hospital rating"]}
                    {showHospital && Object.keys(props.details.satisfaction_summary_stats).map((stat, index) => (
                    <Typography key={index} id="modal-modal-description" sx={{ mt: 2 }}>
                        {stat} - {props.details.satisfaction_summary_stats[stat]}
                    </Typography>
                ))}
                </Button>
                <Button sx={{backgroundColor:"black",padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}} aria-describedby={id} variant="contained" onClick={() => {setShowHospital(!showHospital)}}>
                    Cost Rating: {cost_score}
                    {showHospital && Object.keys(props.details.satisfaction_summary_stats).map((stat, index) => (
                    <Typography key={index} id="modal-modal-description" sx={{ mt: 2 }}>
                        {stat} - {props.details.satisfaction_summary_stats[stat]}
                    </Typography>
                ))}
                </Button>
                
                
            </Box>
            </Modal>
        </React.Fragment>
        
    )
}

export default MapMarkerComponent;


function a(props) {
    /*return (<Modal
            open={modal}
            onClose={() => {setModal(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >

            <Box sx={{ ...style, width: "60vw", height: "80vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.details.name}
                </Typography>
                <CircularProgressWithLabel value={34} />

                <Button sx={{backgroundColor:"black",padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}} aria-describedby={id} variant="contained" onClick={() => {setShowHospital(!showHospital)}}>
                    Overall Rating: {props.details.satisfaction_summary_stats["Overall hospital rating"]}
                    {showHospital && Object.keys(props.details.satisfaction_summary_stats).map((stat, index) => (
                    <Typography key={index} id="modal-modal-description" sx={{ mt: 2 }}>
                        {stat} - {props.details.satisfaction_summary_stats[stat]}
                    </Typography>
                ))}
                </Button>
                
                
            </Box>
            </Modal>)*/
}