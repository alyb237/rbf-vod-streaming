import { css } from '@emotion/react';

const mainContentWrapper = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #d1f3aa;

  .paragraphStyles {
    margin-top: 0px;
    border-radius: 10px;
    background-color: #fbfbf6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 90%;
    padding: 20px;
    line-height: 1.5;
    p {
      line-height: 0.3;
    }
    h2 {
      margin: 0px;
    }
  }
`;

export default function About() {
  return (
    <main css={mainContentWrapper}>
      <h2>Fitness background</h2>
      <p className="paragraphStyles">
        One of my earliest childhood memories is when I was standing on stage
        about to perform a dance routine in a white tutu. Since the age of four
        I wanted to be involved in movement and performance. Thanks to my mother
        who always supported this desire of mine - I became this stage loving,
        need to perform, person. During elementary school I was in gymnastics;
        in middle school I joined the dance team, and in high school due to the
        recession that hit my parents business very hard, I had to quit all
        extra curricular activities and then started running. That is when
        realized I had lumbar scoliosis. Soon after, I developed terrible shin
        splints that eventually led me into physical therapy. I became
        fascinated with the field of work and after high school enrolled in a
        P.T.A. program. Two years into the program my love for music had
        outgrown the desire to work in the healthcare field and I decided to
        study music and sound engineering. Young and poor at 20 years old I
        moved to NYC in search for education. Fast Forward to 2016, I was almost
        done with my Bachelors degree but I was feeling physically unhealthy and
        depressed. I had developed body weight issues when I was 17 and was
        taking diet pills and working out 4 hours a day because I thought I was
        fat. Not only did that cause irreversible damage to my digestive system;
        the fact that I was also heavily partying did not help! I needed to do
        something to help myself feel better about my body and be able to see
        the strength and beauty within myself. That is when I joined a Classic
        Barre Technique teacher training by Carolyn McPherson. It was a
        Pilates-Yoga-Ballet fusion that I fell absolutely in love with. Building
        muscles had never been important for me{' '}
        <em> because I always preferred to be thin </em>but I began joy the new
        shape my body created. Lean, elongated muscles like that of a ballerina
        but with a big sporty booty and a strong core from a proper Pilates
        foundation. I got my first job teaching at Align Brooklyn. The owners
        Christopher and Pam also had a chiropractic practice there and I learned
        a lot from them. After leaving NYC for love in Austria, I started
        working at Body Concept Vienna. This is a place where I have been able
        to develop my classes and method like I never imagined. For the past
        year I have seen my body transform; now I rarely have moments of body
        shame. Although happy with my transformation, I always try and find a
        way to improve myself and the practice. The wellness industry has its
        downsides, for many reasons I prefer not to list. This is a safe place
        where any BODY can log in and practice. I believe in inclusive language
        and defeating the gender norms. Therefore I hope everyone can learn to
        love their physical body and dedicate time to strengthen.
      </p>
    </main>
  );
}
