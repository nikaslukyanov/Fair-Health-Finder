import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

function MapMarkerComponent(props) {
    const [modal, setModal] = useState(false);

    return (
        <Marker position={{lat: props.details.lat, lng: props.details.lng}}
        onClick={() => setModal(true)}>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
            </Modal>
        </Marker>
        
    )
}

export default MapMarkerComponent;