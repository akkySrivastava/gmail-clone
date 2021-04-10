import React from 'react'
import './css/Widget.css'

function Widget() {
    return (
        <div className = "widget">
            <div className = "widgetOptions">
                <img 
                    src = "https://www.gstatic.com/companion/icon_assets/calendar_2020q4_2x.png"
                    alt = "calender"
                />
                </div>
                <div className = "widgetOptions">
                <img 
                    src = "https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png"
                    alt = "calender"
                />
                </div>
                <div className = "widgetOptions">
                <img 
                    src = "https://www.gstatic.com/companion/icon_assets/tasks2_2x.png"
                    alt = "calender"
                />
                </div>
                <div className = "widgetOptions">
                <img 
                    src = "https://www.gstatic.com/companion/icon_assets/contacts_2x.png"
                    alt = "calender"
                />
                </div>
                <hr />
                <div className = "widgetOptions">
                <img 
                    src = "https://www.gstatic.com/images/icons/material/system/1x/add_white_24dp.png"
                    alt = "calender"
                />
                </div>
            
        </div>
    )
}

export default Widget
