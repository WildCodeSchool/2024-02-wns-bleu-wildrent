import { DatePicker } from "antd";
import dayjs, { Dayjs } from 'dayjs';

export default function RangePicker() {
    const { RangePicker } = DatePicker;

    const handleChange = (value : [Dayjs | null, Dayjs | null] | null) => {
        if (value) {
            console.log("value",typeof(value))
            const formattedStartDate = dayjs(value[0]).toISOString();
            const formattedEndDate = dayjs(value[1]).toISOString();
            localStorage.setItem('startDate', formattedStartDate)
            localStorage.setItem('endDate', formattedEndDate)
        } else {
            localStorage.removeItem('startDate')
            localStorage.removeItem('endDate')
        }
    };

    return (
        <RangePicker
        style={{ width: "100%" }}
        format="YYYY-MM-DD"
        className="border rounded-lg shadow-sm"
        placeholder={["début de la location","fin de la location"]}
        minDate={dayjs()}
        onChange={(value) => handleChange(value)}
        />
    )
}
