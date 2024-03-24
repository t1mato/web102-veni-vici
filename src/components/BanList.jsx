import React from "react"

const BanList = (props) => {
    console.log("Ban list: " + props.list)

    return (
        <>
            <div>
                <h3>Ban List</h3>
                <p>Select an attribute in your listing to ban it!</p>
                {
                    props.list.map((e) => (
                        <>
                            <button>{e}</button>
                            <br></br>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default BanList