import RoadmapList from '../../RoadmapList/RoadmapList';

const YourRoadmaps = (props) => {
    return (
        <RoadmapList
            title="Your Roadmaps"
            roadmaps={props.roadmaps}
            emptyText={'No roadmaps created yet.'}
        />
    );
};

export default YourRoadmaps;
