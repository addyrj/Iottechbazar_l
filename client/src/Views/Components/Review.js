import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const Review = ({ id, rating, customerName, review }) => {
    return (
        <div key={id}>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <p style={{ color: "#777777", fontWeight: "bold" }}>{customerName}</p>
                <Rating name="read-only" sx={{
                    fontSize: "3rem"
                }} value={rating} readOnly />
                <h4 style={{ color: "#A6A6A6", fontSize: "14px", fontWeight: "bold", marginTop: "5px", fontFamily: "roboto" }}>{review}</h4>

                <hr className='mt-2 mb-3' />
            </Box>
        </div>
    )
}

export default Review