import React from 'react';
import {APIProvider, Map, Marker, Pin,
    InfoWindow,
    useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Modal, Box, Typography, Button, Popover, List} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {AdvancedMarker, AdvancedMarkerAnchorPoint} from '@vis.gl/react-google-maps';
import './marker.css';

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

  function interpolateColor(value, mean=0, scale=1) {
    if (value == -1){
        return "#999999"
    }
    value = (value - mean) * scale
    value = Math.max(0, Math.min(100, value)); // Clamp value between 0 and 100

    let r, g;

    if (value <= 50) {
        // Interpolate between red (255,0,0) and yellow (255,255,0)
        r = 255;
        g = Math.round((value / 50) * 255);
    } else {
        // Interpolate between yellow (255,255,0) and green (0,255,0)
        r = Math.round(255 * (1 - (value - 50) / 50));
        g = 255;
    }

    return `#${((1 << 24) | (r << 16) | (g << 8)).toString(16).slice(1)}`;
}

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} sx={{color: interpolateColor(props.value, props.mean, props.scale)}}/>
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
          >{`${props.value > 0 ? Math.round(props.value) : "N/A"}%`}</Typography>
        </Box>
      </Box>
    );
  }
  

function MapMarkerComponent(props) {
    // All hooks must be at the top level
    const [modal, setModal] = useState(false);
    const [showSatisfactionModal, setShowSatisfactionModal] = useState(false);
    const [showCostsModal, setShowCostsModal] = useState(false);
    const [showHospital, setShowHospital] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [overallScore, setOverallScore] = useState(-1);
    const [costScore, setCostScore] = useState(-1);

    // Move all calculations into useEffect
    React.useEffect(() => {
        if (!props.details) {
            console.error('No details provided to MapMarkerComponent');
            return;
        }

        const details = props.details;
        const normalized_scores = details.normalized_scores_by_condition || {};
        const satisfaction_stats = details.satisfaction_summary_stats || {};

        // Calculate cost score
        let cost_score = 0;
        let cost_tot = 0;
        
        if (Object.keys(normalized_scores).length > 0) {
            for (const disorder of Object.keys(user_profile.health_profile)) {
                if (normalized_scores[disorder]) {
                    cost_score += normalized_scores[disorder];
                    cost_tot += 1;
                }
            }
        }
        
        const finalCostScore = cost_tot > 0 ? cost_score / cost_tot : -1;
        setCostScore(finalCostScore);

        // Calculate overall score
        let score = 0;
        let tot = 0;
        if (finalCostScore > 0) {
            score += finalCostScore;
            tot += 1;
        }

        const overallRating = satisfaction_stats["Overall hospital rating"];
        if (overallRating && Number(overallRating) > 0) {
            score += Number(overallRating);
            tot += 1;
        }

        setOverallScore(tot > 0 ? score/tot : -1);
    }, [props.details]); // Dependency array includes props.details

    // Early return if no details
    if (!props.details) {
        return null;
    }

    const details = props.details;
    const satisfaction_stats = details.satisfaction_summary_stats || {};
    const ignore_sats = ["Overall hospital rating", "Recommend hospital", "Discharge information", "Care transition"];
    const id = showHospital ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <AdvancedMarker 
                position={{
                    lat: Number(details.lat || 0), 
                    lng: Number(details.lon || 0)
                }} 
                ref={markerRef}
                onClick={() => {setModal(true)}}
            >
                <Pin 
                    background={interpolateColor(overallScore, 70, 4)} 
                    glyphColor={'#000'} 
                    borderColor={'#000'} 
                />
            </AdvancedMarker>

            <Modal
                open={modal}
                onClose={() => {setModal(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: "60vw", height: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {details.name || 'Unknown Hospital'}
                    </Typography>
                    <CircularProgressWithLabel value={overallScore} style={{width: "20vw", height: "20vw"}} />

                    <Box style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: "20vh", width: "100%"}}>
                        <Box style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} 
                                onMouseOver={() => {setShowSatisfactionModal(true)}}>
                            <CircularProgressWithLabel value={satisfaction_stats["Overall hospital rating"]} 
                                style={{width: "10vw", height: "10vw"}} />
                            <Typography style={{textAlign: "center"}}>Satisfaction Rating</Typography>
                        </Box>

                        {/* Rest of your modal content */}
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
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