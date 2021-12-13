import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react/cjs/react.production.min";
import Head from "next/dist/next-server/lib/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://kang:astronomy1@cluster0-shard-00-00.7qv61.mongodb.net:27017,cluster0-shard-00-01.7qv61.mongodb.net:27017,cluster0-shard-00-02.7qv61.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-54c00r-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://kang:astronomy1@cluster0-shard-00-00.7qv61.mongodb.net:27017,cluster0-shard-00-01.7qv61.mongodb.net:27017,cluster0-shard-00-02.7qv61.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-54c00r-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      //  {
      //   image:
      //     "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
      //   id: meetupId,
      //   title: "A First Meetup",
      //   address: "Some Street 5, Some City",
      //   description: "The meetup description",
      // },
    },
  };
}

export default MeetupDetails;
