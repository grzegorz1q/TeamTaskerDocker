import { useEffect, useState } from "react";
import { gantt } from "dhtmlx-gantt";
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import React from "react";
import { GanttIssueDto } from "../../Types/GanttIssuesDto";
import { ReadIssueDto } from "../../Types/ReadIssuesDto";
import { GetProjectIssues } from "../API/GetProjectIssues";
import dayjs from "dayjs";

const convertToGanttIssueDto = (readIssue: ReadIssueDto): GanttIssueDto => {
    // Przekształć ReadIssueDto na GanttIssueDto
    return {
        id: readIssue.id,
        text: readIssue.name,
        start_date: dayjs(readIssue.startDate).format("DD-MM-YYYY"),
        duration: dayjs(readIssue.endDate).diff(dayjs(readIssue.startDate), 'days'),
        progress: 0
    };
};

export default function Gantt({projectId}: {projectId: string}) {
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    const [taskData, setTaskData] = useState<ReadIssueDto[]>([]);
    sendingState;
    sendSucess;

    gantt.config.autosize = true;

    // let taskData1 = {
    //     data: [
    //         { id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
    //         { id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 },
    //         { id: 3, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 },
    //         { id: 4, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 },
    //         { id: 5, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
    //     ],
    //     links: [
    //         { id: 1, source: 1, target: 2, type: '0' }
    //     ]
    // };

    let taskData2 = {
        data: taskData.map(convertToGanttIssueDto)
    }

    useEffect(() => {
        GetProjectIssues(projectId, setTaskData, setSendingState, setSendSucess);
    }, []); // useEffect zostanie wywołany tylko raz, gdy komponent zostanie zamontowany

    // Ref do kontenera gantta
    const ganttContainerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ganttContainerRef.current) {
            gantt.init(ganttContainerRef.current);
            gantt.parse(taskData2);
        }
    }, [taskData]);

    return (
            <div
                ref={ganttContainerRef}
                style={{ width: '100%', height: '80%'}}
            ></div>
    );
}