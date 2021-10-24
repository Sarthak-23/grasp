import React, { useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//componennt
import MainCalendar from './MainCalendar/MainCalendar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Edit } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//classes
import classes from './Dashboard.css';
import './Dashboard.css';
import { Box } from '@mui/system';
import {
    Avatar,
    Chip,
    CircularProgress,
    FormControl,
    FormGroup,
    Grid,
    Tooltip,
    Typography,
} from '@mui/material';
import RoadmapList from '../../RoadmapList/RoadmapList';
import UserList from '../../UserList/UserList';
import UserListItem from '../../UserList/UserListItem';
import UserConnectionRequestItem from '../../UserList/UserConnectionRequestItem';
import Connections from './Connections';
import YourRoadmaps from './YourRoadmaps';
import Pending from './Pending';
import Requests from './Requests';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    maxWidth: 400,
    width: '100%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
};

const inputs = {
    margin: '1rem auto',
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </div>
    );
}

const Panel = (props) => {
    const [details, setDetails] = React.useState(props.user);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [user, setUser] = React.useContext(UserContext);
    const [isEditable, setIsEditable] = React.useState(false);
    const [addgoals, setAddgoals] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    const [editGoals, setEditGoals] = useState([
        'Flying',
        'Singning',
        'Coding',
        'Parking Car',
    ]);
    const [newGoal, setNewGoal] = useState(null);



    const handleOpen = () => {
        setOpen(true);
        setEditGoals([...details.goals]);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (i) => {
        console.info('You clicked the delete icon.');

        setEditGoals((prev) => {
            let newgoal = [...prev];
            newgoal.splice(i, 1);
            return newgoal;
        });
    };
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (details.username === user.username) {
            setIsEditable(true);
        }
    }, [props]);

    const selectHandler = (dateArray) => {
        setSelectedDate(dateArray);
    };

    const handleEditChange = (e) => {
        let { name, value } = e.target;
        console.log(name, value);
        setDetails((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const addGoalHandlerNew = () => {
        if (newGoal != null) {
            setEditGoals((prev) => [...prev, newGoal]);
            setNewGoal(null);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!details.name) {
                setError('Invalid fields');
                return;
            }
            setLoading(true);
            setDetails((prev) => ({
                ...prev,
                goals: [...editGoals],
            }));
            let res = await fetch('/profile/update', {
                method: 'PATCH',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res = await res.json();
            if (res.error) {
                setError(res.error);
            } else {
                setUser((prev) => {
                    return {
                        ...prev,
                        name: details.name,
                        about: details.about,
                        goals: details.goals,
                    };
                });
                console.log(user);
                handleClose();
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError('Something went wrong');
        }
    };

    return (
        <Box className={classes.Container}>
            {/* Create Roadmap Modal */}
            <div className={classes.CR_Modal}>
                <div className={classes.Backdrop} onClick={()=>closeModal(notes.modalContent.showModal ? 0 : 1)}/>
                {true && <CreateRoadmap />}
            </div>

            {/* profile  */}
            <Box>
                <Grid container className={classes.Profile}>
                    <Grid
                        item
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                            }}
                            alt={`${user.username}`}
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGhweHBoaGhgYGhwaHBgaGhoeGhweIS4lHB4rHxoaJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAPEA0QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EAEUQAAIBAgQEBAMFBAcFCQAAAAECAAMRBBIhMQUGQVEiYXGBEzKRQqGx0fAHUnLBFSM0YnOy8RQkU4LhFjM1Q3SSorPD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APTc0QaCvFngHDzuaBDTuaAbNG3jM8V4DiYrxt5wmB0tG5pFx/EKdFc9Rwq+fX07zJcU/aBSQH4aliOp0EDb5os9tdp4xi/2gYuq1kIpr5AE+5Mh4vmDE1vnqNl7A2HuBA9qqcVoqbNVQHzYQVPjVBrZaqG+g8Q/nPBnd2O5++ETODoTpaB78uNT99f/AHCHLzwc4x1XW5voPWTsHxvEIPC7i39429AIHtSvO5p57w/n0jKtVAe7A2O/abXCY+nV+R1byBFx7QJmaLNGmcBgEBivOCdJgK8chjAJ0GAUGdgwY4NA7lEU7migQM04DORQHAzt42dEB4MeDBAzuaAW8ouZ+Y0wqXIzOflX85ZY7FinTdzsqk/QTx7HYirjHd2108IHTW2kAXEuJVcbWDOSFtdU2Fuki4nDMRYr4tPvP+gmt4FwJVsW3KqR6aA/fAcdASojdPEG6+JSCPugUFLhGVQWFsxIJ7Ab/lJlDBAroN9vSxN5cYzEpUSiimzOVz2/cuWYe8m4Y087HcZWt28K6n66e0DOJwok5gNCoNz1/VoP/ZAzsLfMoI9RpNHVqr8NLGw0X6mOq4dEQOPsPbX+9pr7i8Cmr8LGYA7Aa211tOvwzIudtF2UdTfQadzCUsaCmU3zFtfMk7XljiapZkJHhpjRejP09hAoH4M/yot3HzNuL9bfhIyUHoucrMrpqWud7bWnoGBxApUy7nXToNC2th59TK/ivCFqIWp3zN4mJ2BPfz8hAi8uc61PiKmIIKHTM1gwPf09Z6KjA6g3B6jUTxfiPBWUEkjQAGXXJnH2w7/CrE5HAyjfKf5C3SB6iDHFoFHBAI1B2jrwCXizRl4iYBA07mg7xXgGvFBRQIwnROCdgK85ecacLQHXnM0ZnivAyv7QuKMlEUUPjqXv0OUb2mY5XxCJTYsQCbgdx+jGftMxJOJVP3UFvVv9JSYar4lphvETrYC4ga/hfGM4amPnUnLbqOo9esj8wYd3Q2BuTmAA7izCaLgvLdNAG3Yi+u95oDgFIswBgeacLwRDZ2vYIbb31W35whGRC2wKhR3LMTp9956E3C0tbKLStx/BQ9tNF1A8+8DHYzFKtO1z4Slrd1t+vaRTxd3ovfq6fdqbTTY/lgumX6yt/wCyhChF2vc+cCn4TiVzl2F8guq9C7HT6CWyYoABmbrdrAa9lUdoWlys66DrL7CcuoBqL6WJ39hAx+Pxj1rE3SmGuABqTpqSZbYbmJUyJ4Qotc5jcnrc95Z8V5cJ+TfYX2XSY/H8rui53bW+2wAvuYGz4itOqn9Xle9rqupY9BfoNN5keJYJ6bF3+Y30HyjsB6Sz5Seor2BAXrfQe3eW3MrIlMuxDP8AYUi5LW0Nu14FhyXxP4lEIx8dPTXqvQzR3nkHKuOejWV2Ns5AN9zc9ugnrZeATNHXgM0IGgPnbxgadEB14pyKA0CIidETQBvBmEaNaAIzqxGOAgeJ88Y34vEamX7Flv0uoux+pt7Sx5D4Kr1DWY6KdB3lDzBVQ4zFOP8AiMAPMaE/UGegfs9w2WjmsRcwNvhkkoSPSh1aA8iNKCLNFeBwrGmkI68THzgDyjtHpaDMcIBcgMr+K8MV0JbsfPSWNEwtandSO4geQ8QrVMNdsN8oPUA6Hf0tKp+IV3YVWZGboXAsO1uk01VTTxLKwGRzlIPS/wAp1lXxMDB1Tlpl0caodVF+qaaddIEbhy52LOUZ+1zfTXQDaencPxQekjjqonmuGoUXu9LOjAk3Ug99wek2vKT3w48ZfxMLnyPbpAvgYUNI4MIrQDK0eGkcNHqYBs07BxQCAxExkTGBwteMJjTGloHWMQaMaNBgeFY6hmx1dRt8V/8AOZ69y9Ry0lsLCwnlHD6efiFUbf1lQm3k5vNlx/jLqv8As2HBz2His33W0gehIR3EOs8iw2C4rTGdU06gMGJ9RfeFT9oWKwzBcRhyR5grp5HYwPWSsaoMy3L/ADpSxTWVSpPQzVUusB+WBZ+0j4ziqIfEwAtPPOL/ALQwhIprmsTqdPTSB6UHj2tfSeIjmnH4hvAG8gqaf9ZJfjGOUq7s6drXC6dx1ge1URJRGkwfJvNb13+HU1IHzbTeE6QMpzFwYVCW203+8H2ldSpfFptRqrdl0BNi3kbdR5zW12I3Hv095msa2SsrqQuliHIsQex6ekDC/wC2Jh3dChDX/i089QRNlyiynD51+27k6W1vbaZ3mxEuX+HctrfcCw6Efzl1yc/+6pZSo13N+pN/reBpVaOBkdHhVaAa8IrQCw6CA7POxRQCXnGMaY1hAY5gmMIwgyICUx4WNtHNVCqSxsB1geTcvYG/EcZ0yu4+rman4KYZXxNXZRbYXJJ0HqTYSs5doWxuKddnrOR/CTmG/qZpOYeENiEWmxAQurMdiAuulut7bwMtU/aGpD6PZD9gJlsTYfMwZtewkavzaXQEorK2wdChOtjlOqmXGI/ZxhWOZTU2FgGH11GsruPotOkmFNPMiL4R1Fz1bpAJyZxDDvWy/DCPe6nz3sexnp6vYazzPkfgeV/iFVvplAvoB1ud956DXOoECg5zwCmlntY30N/uMyeExWEoIAUR6hP2tgOpYm9gPrPUOL8LWvhmQ6XFwexG08SxHC/67JVJAzAN3yg6gQNnT5nwyouWsiZs2Umi6IcpswViNbHz6x9Lj6Mt3QVU6vSs+Ud2Te3peU1f9nlHKGStUYDUBsttfTaWVLlei7g52pMB81IhDf01vAscNwZc6YjDMCra3HY+k3GEclRfeYbguArYBymY1aFQ3VrWZGO+YDSx7ibTAVb+vvAkVqYYEGeU86YRBUFgyntclG9Ox/KetGYLnhCCtgCCwBzWI8vQwKxaqJh7AEEjS9rH+EteXvDKGSkidlBPvqfxmNxpFR6VJFIYtpqSoF7nQzev28oDFaSabyOsIpgS1eHVpBQyQjQJOacjLxQDkThnWM5AC4gi0M8FaA6UHPWJZMFVKmzWsD1v5TQTJ/tF8VFEvbO4/EQIHIJLLmfVja57mbiutxYfnMfymmQW+k21NtIFa9gLa+2n6Eg1OFLUYFhsfc9pd1aVzB1XSmt2Pp5mALD0lTYQj1fEIqSl2BItB4lMrwNBRbwCZTmfgtKtqfC/7w39+80lA+AEa3mX5m4t8KoikHK40PmNxAgcP4XVogqHzLfY9pMTBvmv8v8Ayg295OwFYOARLNKcBuETQA6jzEl4amFOkSJJKCB1pnuOcODkHexv32EvnaA8zAyHFnw2DVa1WmzOdlS5IHfXRRJlLFJWppWpXyVFuL7juD5yQ2GSsazBldKiZR9q1gbWmf5QVlwVNT0eqB6B4F0BHrAl49XgSaYhkEj0zJCQC6RRkUCVeNYxzRrCA1hGWhCsCxgOtMxzmgPwSdgx9trfjNIDKXmygHojW3isD2JFh99oFVwM9xa2n0mxwx0EyfD9GI9L+theaPDPYCBYV6iotzMzhM2KxGc3+FTOnZm/KT8cr1TkBsOp8ox+J0cOBTBF+2mpgR62JxK4lUFNWo21fPZwe4Gx6aecq+NcYPx/gpcta9tz7SQ3MwZggRtevqCf5Sk4xxNGxVKjUBRmVcrpYPmY6At0U7QNPxLiWLw6U1w+HauxF28Sqqjtve/tKnmLGV8ZhkQ4ZqddXzlbhsqqCPmHe+287wRHWo5FZyysVdXa5NtfoAZPq8xqjHMmUAgM+4uTYbdD3gUXKvGCGCObEaEbajTrPRMI4NrdZ5/xLhgxDfGojI5bxDox7+pmm5dxLqoSoCGG94GqURXiRtIiYA3MGQCCDsQQZ12lbxzP8B1S+ZhluNCAdCR52gYfkNzTrtRD5kDOF6jKCbWPtL3BoEpIoFvna38bsYzC8Cp4MhkYlnXIinUhjub+Q1h3IzeH5QAo9ALQHqBCBYNWj1gGpSSrQFIQ6wH/AK6RRRQJYnYliLQOkQDrC5oJjADaROM0M9FwBe2v0IMmmPUwMlhKdnt3AmhoDSRsXgVR1ddAbgjt6Ss4pzRSw11e4Ybabg7EH7oDeZeLNQTJTF3drH+6tv0PeZbAsc4zDM7A5b7IASCxHQbm/XSVHFeOtXZzcAXvr0t8uo2A39ZSniB1CM1msGOzMqm6g++sDfpiERH2V2a2Yj5iQPl7DUDyAMyfE8QKmIaqpN6RQC5v8v6++RhhcbXJK06jk2AJBOg63b2llguS8flN6apm3zML7eV9IGpo4xA/xVsPiZL63Ie1hY9M6Ea9wROPVRiEbwu9ypJshUkizX2zWII72mTxPLONp5rqCNNj1B0IkV+KVAVTEUy2S+VrlWW++o3UncH1gbihilWo65yhprT1OoIsVub6XU2+k1PCcUK6B8wzqWViNL5TobdBPKeE8SR6gzvkIPh7HUnIf7pudLS5wHHxh8QGYBVdbkKfAysR4xbY6EFYHruHfSEYyDhK6FQyMCraqb3uPKSyYDHMhu4clAdrXh6zTDpxGtTrO6MCjNchgdOgsR7QNVxaoqqugzahfIdTKRWgqmKZzmY3P62hKQvAk0xJSiBprJKwHpCoINWhUgdtFCXigSC0GZ0mK8Dl40mOYwRMDpnCY0tOCAHiROS/7pBlXiOH0q1xURXFuo19u0uitwQdjpKmmcpy320gY/iXJKOR8NyoJ1W1xL/gvJlCioLDMRveWy0vECJPRCd4EapiggsosB2lZiMW5JYuQB0Evm4eD7ytrcuZibOQPrApq2KVvtnUd4LEcupWXQ6/WXOF5RUG5cn1l3heFhLWgeXP+z9yxGw6ERuG/Z5UFQI72Q7Ea/6T19k8oKrTvbygUvLfAFwy2U5iRqTvL9mgV0iYwIfE62VHPkZhPiEn3mp5lqEU7dzMemhgWNJ9pOw7ytRtpMoHSBaU31hleV6mGRoE5G1ktDIFIydSgGiiigE6RToigMZoF2hmgWEBgMesEV6wiwCLMdh+ZaGIxNSnTJuuzHQMRoSvkCBBftF5j+BS+Ajf1tQWNjqqdT5E7CeT4So9NldGsym4MD3yjiO59ZPp1OomH4DxdcSmZTZ1FmS/X8pMHEXQ6DMOq9faBtaOJBiq4xVImSPMaKLm6nrcWlPX5kDuDfSB6Hhsbf0vLJCDPORzEtgBLfAceL2ttA1zkQLGQqGKuL3hC/aA5jGEXjlXvCFYGX5lOqr21/leZk0TeA5r4i39JjK3hpoqOBt4iWIPoCpls9MfkfygRV0k2gfeBFPvJdCnAkUoYeUbSWHRIBqMnoZFpU5JQQCXinIoEoRMIQLpGsIAoxxFiKqICzuqKOrEAfUzN43nTDLojNVbtTGl/wCI2EC+KTK8483phAaaWeuRoPspfYt/ISK3H8TiBV+H8PDpTTMzE53N7hQt7AE2PQ2tPKK1VndndizsSSxNyT6wH4nEPVdnqMWdjck/rSJVhaVOGCWgPwFd6LitTNiNxrZh1Bnp3BsemKT4iaONHQ7qfy855th+x1HT1k/AVXpOKtE5XG43Vh1DDqIHoOIwyMcroD6iDHAMOfsAHuNIbgnFKWMUsoy1F+dCdR5juvnLFqY1FrQMbxXhCIRkv6XheGcLDMLsSOw/KT+Kob9PeRuBuRUtf79IG4wOGVVEnqsDhRdRDEwHiQOOcUTDUHrOdFGg6sx+VR5k6STWrKiF3YKii5J0AAnkvFuMtxDEZgCMNSbwKftPtnb9aAwIFEM2d6lviVSzt5ZtQB2sLCaLgmLzpkb500PTw9PylNVUljrfsL2+nedp1SpVgbMOw21+m0DVrTkmmnaU3D+YqZ8NUhG7/ZbzHaaHDuji6OrehBgOpIIcLHJRjstoHackKTI6wqCBJ8M7BWigV+P5xwyEomas/wC7TFxfzY6fjG1TjaqZi9PCLa5sDUqKOxJGVT7TDcPGKSl4cNTTMb/EqPkaw9dBuPeOTmiphwQ9dGJ3amhrMD0yvVIQeoVoFFzBQxJdWdnfO5VGqFiz67oh1y+drS14dwZ0p/FrMEW+hY5QR1I99B9ZQ1+Z2ztUW5qMCDVc/EqEHpnIsoA/dUSpxWOrVGu7sT3Zixt2uYF9xrG4YKRTd3Ygglbop7Ak2JUekzWHW6+8Gacl8IF2Ze4v+vrANRQjcdZJpee1v17Qq0bae3aScNhHdgijMzHQbanpeBGFFirOEJVLZmAJCgmwufMxFiDvp9dO0scRx9aFRaFMZ8Mt1xBA0rFhapqRso0XzF+sFisL8N8mYMpUMj9HptqjeRtofMGAHDVXp1FqU2KupuCNvMEdVPaem8vcdTFpkNkxAHiTYPbdqZO/8O4nm6i1u/tvDrTJIZTlYG4N7EEbEEdYG8x9ixQ6EdOt5XU6ORx2J6RcJ5gWouTGqz2vlrILOo/vgfOB3l0eAF0D0Ki1k6FSM3oQTv7+0C94fVuoEPjsUlNc7mw2AAuWJ0CqBqzHoBKzhVGuVsiAAXBdzYAg2NgNWI18tN5R8wcz06D/AA8MRicXaxqNY06N9Da2gPkNe5gVPPPFqjsMOB421FIaiip2esRvUPRNl3NzaVVLDinTVF0CjU2AN+8WHwxp5mdi71CWeodSzE3jK9TNcb+p012tc3HWAx6lj8x12B2On3dIML1N7ai+w/G8u8fgqLMlBGtXFJHyNs91YkL0Di23W8pjTOoINxuLdtNfO56wI+Sw8SAgWLEgjQkXPpqZcYjBUi4GGqBwVUnK1wjm9lLX622vfWDw6AjKRuLbaG+mvvKbhHHkp5kdALXXNYqQb73Xse4gWicy1aL5C5VuzglTr3tt6TU4HieIYXaiHFr3psbkd8rgae8qMNxGhUYuviYplZXCurXIzar4luBvbSa+lxOkaORGdimgupqMB2DJ47eZF4AMJxmizZS2Ruzgr+ItLlAGGhB8wbzAY/mRWcZ6LhQSCppuP+bVbqYXg3EPiGqURkyZT9pGsTvYdPWBvPhxTH/0o/8Ax2igeWY7jdeubu5PqSbfXQe1pC+ET8xJP1k1KNowjWAFaQEKEnbGPHpAEUEVA5Kit0vY+h0MkFLD2+kFUS4t/pA0Jw2p30MsMJSymgl7HF1PhFxp8NMyioAbaOwNvRpS4HEFqQ18YNiPwPuLSxw96ivQvlYlXot+7WX5demYeH3gbXmjhNBEWnTRAWZUQKQLC2xW+wDE7dLkzD06Ny+DvetR8dHuyMgqVKHqPmUdwwlfV5tq587AiqFKG+g7bWuOt1++UQxtT4vx85+Jnz5uua97/XpA0dJwRp11v+Mko9tLkXg8U6uFxKKAlViHUf8Al17Auu98rfOvqRHIym1z/PeBNo1jmzDQaeWhHeS8UlWl/vOGqfDKjM6C4VgoBN+hMrsOSDrY66X9vynea+K/Cw4w6kh3F3/uoSfvbb0EBuI5uxeMUUA4o0gTmWmSrPdiTma9zqToLD1lngMClFMqLfqbgdJ5pTuNVJBHYzVcF45nslQnNawPf/rAu65ufXzFgbHsLX9INFzuBbdve+hH4x9dMhGWwFr2F/106SVwTD3xCHpmv12BB08tIFm3LtPE4nEVWUlqbJTTxEBCiUyW8NtQX9rSPxGgAUVyRUJKI7ArndQPBUJ+2QcyudCNDrvTcr86LQxGIWrc06tZnVwL5WzEajcoVsD1GUQ3H+MJisRQpo2YPiabGxDKAvhFiLdCd9dYBERl+Yam4II1Ht7WmSq8PBdxfZyB9d5sc9ne9vnc9R9tukocSP617dWv66C9oFWnDT31HXbaH+NXp2KuxI6Hxbess0bcW1Hl22/CNrUri2nse3lAJgucsSmjjOvY+IfRtvYy1XmjDVWDVKYV7WzAlTbTTW4P1mdFDpb9fnAvhQekDc/0thf32/8Ah+cUwP8AsA/X+kUAYpaa9Yw0wNxJ9O1ttfugqw6979P1aBFtbpOukc/3dJ0A/wCsAA1trOIlz/1hXAA7/hAosA+FqBHuflfQ/wAj9ZZYlyCGU2sdLbgixEqsQt1P6MmYOtnSxIzJofMdDAj8xUlcjELoXuHXtUX5m8gwIPrmlKrCXtDCoXyVCVRzbN+4x+VrdgbX8rynxOFam7I4s6sVYeY7dxAtOX+ILSZkqXNCqAtQDddbo6/3kNj9ZcVsG9KoUchiuqsDo6Nqjqf3WXX1uJklms4I5xNH4epr4dSaXXPSvd6dtyV1ZfcQLDB01VWqP8iKW06d7C/tMnw/CvjsSbmxYMzHsqre2nsJY8wcYzU1oJ5M5+ll/An0EqeHYhqNQOL2sVZRoWRhlYfQ/dA2+K5IqU6YClHGY7aGyg5vUAg6zGca4UaLb69LegOnsQZo8Vx/4xu1VgpvcK2UfKBquYFQ32gB3tvK3iuJFQqFOYLe7WsCxAGg6KAoAgSOD8W+IoVtWXQjqfMTT8JZU+LVN/6ui79N8tgNt9Z5uc1Jw699bfhNo1Yf0diKqmxqvTpjU7fM4+l+sDBKL779Ze8l0wcdQB/fv9FJ6+kqBTmh5DS+NQ72Vz9EaBoUQuSwIuWY6C2tydr+ZlVWp/1rg6eIf5R98lYByMoN9vUbC3rIwN6tU9mP8gYDkp28rDc639R2hggPr+I36x2XTS566b/rSHprcm+m9tja19YEP4ZG43+u3+s6mH7276dP0JMqoR0076b2t9I1h5e9oAvhL5/r2ihsjdjOwM90HoYN/wCU7FAjjr+uhhl+X9d4ooEZv5wC9fedigEPyn0neD/M/wDAYooBcR8n684zm7+0j/Co/wD1JFFAp06/rrNLyP8A26h/GPwiigU+I/tFb/Ef/OY5un66mcigR2+YfrrLTD7fSKKBEx3ymXeE/wDCR/6z/wDGKKBQ1Ov66S85C/tQ/wAOp/kMUUC4wvzJ/wAv4SLR/wC9qf4hiigWn2fYQmG2PoPwMUUDlTZ/10EfX29h+AnYoD4oooH/2Q=="
                        />
                    </Grid>
                    <Grid item className={classes.info}>
                        <Box className={classes.fieldContainer}>
                            <Typography style={{ color: 'grey' }}>
                                Username
                            </Typography>
                            <Typography>{user.username}</Typography>
                        </Box>
                        <Box className={classes.fieldContainer}>
                            <Typography style={{ color: 'grey' }}>
                                Name
                            </Typography>
                            <Typography> {user.name} </Typography>
                        </Box>
                        <Box className={classes.fieldContainer}>
                            <Typography style={{ color: 'grey' }}>
                                About
                            </Typography>
                            <Typography>
                                {user.about
                                    ? user.about
                                    : 'The user has not mentioned about them.'}{' '}
                            </Typography>
                        </Box>
                        <Box className={classes.fieldContainer}>
                            <Typography style={{ color: 'grey' }}>
                                Goals
                            </Typography>
                            {details.goals.map((g, index) => (
                                <Chip
                                    key={index}
                                    label={g}
                                    style={{
                                        margin: '0.2em',
                                        backgroundColor: 'lightgreen',
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {isEditable ? (
                        <Grid item>
                            <Tooltip title="Edit" onClick={handleOpen}>
                                <IconButton color="primary">
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Edit Profile
                                    </Typography>
                                    <TextField
                                        id="outlined-username"
                                        label="Username"
                                        disabled
                                        value={details.username}
                                        style={{ width: '100%' }}
                                        sx={inputs}
                                    />
                                    <TextField
                                        id="outlined"
                                        label="Name"
                                        placeholder="Your name"
                                        value={details.name}
                                        name="name"
                                        onChange={handleEditChange}
                                        style={{ width: '100%' }}
                                        sx={inputs}
                                    />
                                    {editGoals.map((g, index) => (
                                        <Chip
                                            key={index}
                                            label={g}
                                            variant="outlined"
                                            onDelete={() => handleDelete(index)}
                                        />
                                    ))}
                                    <div className={classes.addGoals}>
                                        <input
                                            onChange={(e) => {
                                                setNewGoal(
                                                    e.target.value === ''
                                                        ? null
                                                        : e.target.value
                                                );
                                            }}
                                            type="text"
                                            value={newGoal || ''}
                                        />
                                        <IconButton
                                            onClick={addGoalHandlerNew}
                                            aria-label="delete"
                                            color="primary"
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                    <TextField
                                        id="outlined"
                                        label="About"
                                        placeholder="Write something about yourself"
                                        multiline
                                        name="about"
                                        rows={4}
                                        onChange={handleEditChange}
                                        value={details.about}
                                        style={{ width: '100%' }}
                                        sx={inputs}
                                    />
                                    <Typography color="error">
                                        {error}
                                    </Typography>
                                    <Box
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>

                                        {loading ? (
                                            <CircularProgress />
                                        ) : (
                                            <Button
                                                variant="contained"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Modal>
                        </Grid>
                    ) : null}
                </Grid>

                {/* Calander  */}
                <Box className={classes.Calendar}>
                    <MainCalendar selectDateHandler={selectHandler} />
                </Box>
            </Box>

            <Box
                style={{
                    width: '100%',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                    centered
                    style={{
                        margin: 'auto 1rem',
                    }}
                >
                    <Tab label="Roadmaps" />
                    {isEditable ? <Tab label="Connections" /> : null}
                    {isEditable ? <Tab label="Pending" /> : null}
                    {isEditable ? <Tab label="Received" /> : null}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <YourRoadmaps
                        user={user}
                        roadmaps={props.roadmaps}
                        isEditable={isEditable}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Connections user={user} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Pending user={user} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Requests user={user} />
                </TabPanel>
            </Box>
            {/* RoadMap  */}
        </Box>
    );
};

export default Panel;
