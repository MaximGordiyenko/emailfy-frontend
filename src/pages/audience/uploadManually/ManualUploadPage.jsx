import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles.css';
import ProgressBar from '../../../components/progress-bars/ProgressBar';
import { ROUTE } from '../../../routes/routes.constants';

export const ManualUploadPage = () => {
  // const [isRow, setIsRow] = useState(1);
  // let { id } = useParams();

  // const navigate = useNavigate();

  /*useEffect(() => {
        const addAutoResize = () => {
            document.querySelectorAll('[data-autoresize]').forEach(function (element) {
              element.style.boxSizing = 'border-box';
              var offset = element.offsetHeight - element.clientHeight;
              element.addEventListener('input', function (event) {
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + offset + 'px';
              });
              element.removeAttribute('data-autoresize');
            });
        }
        addAutoResize()
    }, []) */
  // useEffect(() => {
  //   var scroll = document.getElementById('vl');
  //   var offset = scroll.offsetHeight - scroll.clientHeight;
  //   scroll.scrollTop = scroll.scrollHeight;
  //   scroll.animate({ scrollTop: scroll.scrollHeight + offset + 'px' });
  // }, [isRow]);
  /*
        fetch("/signin?email=stopup.mail@gmail.com&password=123456", { method: "post" })
            .then(response => response.text())
            .then(result => console.log(result, "result"))
            .catch(error => console.log('error', error));
    */

  const handleChangeText = (e) => {
    // setIsRow(e.target.value?.split('\n')?.length);
  };

  return (
    <div>
      <div className="inner-content">
        <div className="count-upload">
          <div className="title-count">
            <p className="main-text">Adding contacts</p>
            <p>Just copy your contact list as text and paste it into text field</p>
            <span>4 contacts added</span>
          </div>
        </div>
        <div className="area-wrapper" id="area">
          <div className="vl" id="vl">
            {/*{Array.from(Array(isRow).keys()).map((item, index) => {*/}
            {/*  return (*/}
            {/*    <span key={item} id="sp">*/}
            {/*      {item + 1}*/}
            {/*    </span>*/}
            {/*  );*/}
            {/*})}*/}
          </div>
          {/*<textarea className="textarea" onChange={handleChangeText} />*/}
        </div>
      </div>
    </div>
  );
};
