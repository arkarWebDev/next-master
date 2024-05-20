import Image from "next/image";
import AboutImg from "/public/about-us.jpg";

const About = () => {
  return (
    <main className="mt-20">
      <h2 className=" uppercase my-4 text-3xl tracking-wide font-bold text-center">
        About TeachCorner
      </h2>
      <div className="mx-auto">
        <Image src={AboutImg} alt="about-us" className="mx-auto" />
      </div>
      <div className=" text-sm font-medium tracking-wide space-y-3 text-gray-700 mt-5 text-center">
        <p>
          <span className=" text-black text-normal">TeachCorner</span> is an
          innovative online platform dedicated to fostering a vibrant community
          of learners and educators passionate about programming. Our mission is
          to create an accessible, interactive space where anyone, regardless of
          their experience level, can both learn and contribute to the
          collective knowledge of coding and software development.
        </p>
        <p>
          At TeachCorner, we believe that the best way to learn is through
          sharing and discussion. That’s why we’ve built a user-centric forum
          where topics can be created, questions can be asked, and programming
          challenges can be tackled collaboratively. Whether you’re taking your
          first steps in coding or you’re a seasoned developer looking to share
          your expertise, TeachCorner is your go-to destination for all things
          programming.
        </p>
        <p>
          Join us today and be a part of a growing community that’s shaping the
          future of technology, one line of code at a time.
        </p>
      </div>
    </main>
  );
};

export default About;
