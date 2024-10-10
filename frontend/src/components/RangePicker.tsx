import { DatePicker } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useState, useEffect } from "react"

export default function RangePicker() {
    const { RangePicker } = DatePicker;

    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([
        localStorage.getItem("startDate") ? dayjs(localStorage.getItem("startDate")) : null,
        localStorage.getItem("endDate") ? dayjs(localStorage.getItem("endDate")) : null
    ])

    const handleChange = (value: [Dayjs | null, Dayjs | null] | null) => {
        if (value) {
            const formattedStartDate = value[0] ? dayjs(value[0]).format("YYYY-MM-DD") : null
            const formattedEndDate = value[1] ? dayjs(value[1]).format("YYYY-MM-DD") : null

            if (formattedStartDate) localStorage.setItem("startDate", formattedStartDate)
            else localStorage.removeItem("startDate")

            if (formattedEndDate) localStorage.setItem("endDate", formattedEndDate)
            else localStorage.removeItem("endDate")

            setSelectedDates(value)
        } else {
            localStorage.removeItem("startDate")
            localStorage.removeItem("endDate")
            setSelectedDates([null, null])
        }
    };

    useEffect(() => {
        const startDate = localStorage.getItem("startDate") ? dayjs(localStorage.getItem("startDate")) : null
        const endDate = localStorage.getItem("endDate") ? dayjs(localStorage.getItem("endDate")) : null
        setSelectedDates([startDate, endDate])
    }, []);

    return (
        <RangePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            className="border rounded-lg shadow-sm"
            placeholder={["début de la location", "fin de la location"]}
            onChange={handleChange}
            value={selectedDates} 
        />
    );
}
