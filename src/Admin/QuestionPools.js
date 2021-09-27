import React, {useState, useEffect } from 'react';
import axios from 'axios';
import QuestionPoolsChild from './QuestionPoolsChild';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row,Col } from 'react-bootstrap';
import SearchQuestion from './SearchQuestion';
export default function QuestionPools(){
    const [allData,setAllData]= useState([]);
    const [loading,setLoading] = useState(true);
    const [questionPool,setQuestionPool] = useState(Array.from({ length: 7 }));

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  display:flex;
  justify-content:center;
`;
const url='127.0.0.1';
    useEffect(()=>{
        
           const getAll=async()=>{
             setLoading(true);
                await axios.get(`http://${url}:8000/api/index`).then(response =>{
                setAllData(response.data.sort((a,b)=>b.id - a.id));
                // .sort((a,b)=>b.id - a.id)
                setLoading(false);
                  }).catch(err=>console.log("while getting question pool",err));
                }
                getAll();
                

    },[]);
    const handleDelete = (id)=>{
        setAllData((prevState)=>{
          return prevState.filter((item,i)=>item.id !==id);
        });
    }
    const [hasMore,setHasMore] = useState(true);
   const fetchMoreData = () => {
      if (questionPool.length >= allData.length) {
        setHasMore(false);
        return;
      }
      // a fake async api call like which sends
      // 20 more records in .5 secs
      
      setTimeout(() => {
      // let no = 14;
      // setQuestionPool(allData.splice(0,no));
      setQuestionPool(questionPool.concat(Array.from({ length: 7 })));
      }, 700);
    };
    const beatLoader=(
          <BeatLoader
          css={override}
          size={15}
          color={"#6699CC"}
          loading={true}
           />);
  return(   
            <>   
            <SearchQuestion data={allData}/>
             <InfiniteScroll className="overflow-hidden"
              dataLength={questionPool.length} //This is important field to render the next data
              next={fetchMoreData}
              hasMore={hasMore}
              loader={beatLoader}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              } >
              <Row className="align-items-center">
            {questionPool.map((val, index) => (
              loading === false && allData[index] && <Col lg={6} md={12} >
               <QuestionPoolsChild key={allData[index].id} question={allData[index]} 
                answers={allData[index].answers} handleDelete={handleDelete} /></Col>
          ))}
          </Row>
          </InfiniteScroll>
          </>
            );
            }

