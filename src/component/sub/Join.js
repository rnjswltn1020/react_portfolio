import Layout from "../common/Layout";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Join() {
  const initVal = {
    userid: "",
    email: "",
    pwd1: "",
    pwd2: "",
    edu: "",
    cmmts: "",
    gender: null,
    interests: null,
  };

  const [Val, setVal] = useState(initVal);
  const [Err, setErr] = useState({});
  const [Success, setSuccess] = useState(false);
  const [Submit, setSubmit] = useState(false);
  const history = useHistory();

  //인수로 전달된 값으로 인증처리해서 에러객체값 반환함수
  const check = (val) => {
    const errs = {};
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[!@#$%^&*()_+]/;

    if (Val.userid.length < 5) {
      errs.userid = "아이디를 5글자 이상 입력하세요.";
    }
    if (Val.email.length < 8 || !/@/.test(val.email)) {
      errs.email = "이메일은 최소 8글자 이상 @를 포함해주세요.";
    }

    if (
      Val.pwd1.length < 5 ||
      !eng.test(Val.pwd1) ||
      !num.test(Val.pwd1) ||
      !spc.test(Val.pwd1)
    ) {
      errs.pwd1 =
        "비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함해주세요.";
    }

    //pwd2 체크항목
    if (Val.pwd1 !== Val.pwd2 || !Val.pwd2) {
      errs.pwd2 = "비밀번호를 동일하게 입력해주세요";
    }
    //pwd2 체크항목
    if (!Val.gender) {
      errs.gender = "성별을 선택해주세요.";
    }

    if (!Val.interests) {
      errs.interests = "관심사를 하나이상 선택해주세요.";
    }

    if (!Val.edu) {
      errs.edu = "최종학력을 선택해주세요.";
    }

    if (Val.cmmts.length < 20) {
      errs.cmmts = "남기는말은 20글자 이상 입력해주세요.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //객체에서 변수값을 key에 넣을수가 없음.
    //객체에서 변수값을  key값으로 활용하려면 객체안에서 변수명을 대괄호로 묶어줌.
    //setVal({ ...Val, userid : 현재 입력된 값})
    setVal({ ...Val, [name]: value });
  };

  const handleRadio = (e) => {
    const { name } = e.target;
    const isCheck = e.target.checked;
    setVal({ ...Val, [name]: isCheck });
  };

  const handleCheck = (e) => {
    let isCheck = false;
    const { name } = e.target;
    const inputs = e.target.parentElement.querySelectorAll("input");

    inputs.forEach((el) => {
      if (el.checked) isCheck = true;
    });

    setVal({ ...Val, [name]: isCheck });
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;

    setVal({ ...Val, [name]: value });
  };

  const handleReset = () => {
    setSubmit(false);
    setErr({});
    setVal(initVal);
  };

  const handleSubmit = (e) => {
    // 순서 2: check 함수 호출해서 Val 값에 담겨있는 값을 check 함수의 인수로 전달해서 err객체를 생성해서 반환 => 반환된 에러객체는 닷 ㅣerr state에 옮겨담음.
    e.preventDefault();
    setErr(check(Val));
  };

  useEffect(() => {
    // console.log(Object.keys(Err).length);
    const len = Object.keys(Err).length;
    if (len === 0 && Submit) {
      setSuccess(true);
      history.push("/");
    }
  }, [Err]);

  return (
    <Layout name={"Join"}>
      {/* 순서1: 전송버튼을 눌러서 handleSubmit 함수호출 */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원가입폼 양식</legend>
          <table border="1" collapse="none">
            <caption>회원가입 정보입력</caption>
            <tbody>
              {/* userid */}
              <tr>
                <th scope="row">
                  <label htmlFor="userid">USER ID</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="userid"
                    placeholder="아이디를 입력하세요"
                    name="userid"
                    value={Val.userid}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.userid}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="pwd1">PASSWORD</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pwd1"
                    name="pwd1"
                    placeholder="비밀번호를 입력하세요"
                    value={Val.pwd1}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.pwd1}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="pwd2">PASSWORD 재확인</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pwd2"
                    name="pwd2"
                    placeholder="비밀번호를 재입력하세요"
                    value={Val.pwd2}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.pwd2}</span>
                </td>
              </tr>
              {/* user email */}
              <tr>
                <th scope="row">
                  <label htmlFor="email">E-mail</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="email"
                    placeholder="아이디를 입력하세요"
                    name="email"
                    value={Val.email}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.email}</span>
                </td>
              </tr>
              {/* gender */}
              <tr>
                <th scope="row">Gender</th>
                <td>
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <span className="err">{Err.gender}</span>
                </td>
              </tr>
              {/* interest */}
              <tr>
                <th scope="row">Interests</th>
                <td>
                  <label htmlFor="sports">Sports</label>
                  <input
                    type="checkbox"
                    id="sports"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="music">Music</label>
                  <input
                    type="checkbox"
                    id="music"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="game">Game</label>
                  <input
                    type="checkbox"
                    id="game"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <span className="err">{Err.interests}</span>
                </td>
              </tr>
              {/* edu */}
              <tr>
                <th scope="row">Education</th>
                <td>
                  <select name="edu" id="edu" onChange={handleSelect}>
                    <option value="">학력을 선택해주세요</option>
                    <option value="elementary">초등학교</option>
                    <option value="middle">중학교</option>
                    <option value="hight">고등학교</option>
                    <option value="college">대학교</option>
                  </select>
                  <span className="err">{Err.edu}</span>
                </td>
              </tr>
              {/* cmmt */}
              <tr>
                <th>Comments</th>
                <td>
                  <textarea
                    name="cmmts"
                    id="cmmts"
                    cols="30"
                    rows="5"
                    placeholder="남기는말을 입력해주세요."
                    onChange={handleChange}
                  ></textarea>
                  <span className="err">{Err.cmmts}</span>
                </td>
              </tr>
              {/* button set */}
              <tr>
                <th colSpan="2">
                  <input type="reset" value="CANCEL" onClick={handleReset} />
                  <input
                    type="submit"
                    value="SUBMIT"
                    onClick={() => {
                      setSubmit(true);
                    }}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
}

export default Join;
