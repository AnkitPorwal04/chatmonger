import React from 'react'

const Header = () => {
  return (
    <>
        <nav style={{
            backgroundColor: "#ffc1cc",
            height: "5vh",
            textAlign: "center",
            justifyContent: "center",
            display: "flex"
        }}>
            <h1 
                style={{
                    color: "purple",
                    fontSize: "25px",
                    justifyContent: "center",
                    display: "flex",
                    fontWeight: 'bold',
                }}
            >
                ChatMonger
            </h1>
        </nav>
    </>
  )
}

export default Header
