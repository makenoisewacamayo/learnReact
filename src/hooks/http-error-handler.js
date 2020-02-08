import {useState, useEffect} from 'react';

export default httpClient => {
  const [error, setError] = useState(null);
   
  const { request, response } = httpClient.interceptors;
  
  const reqInterceptor = request.use(request => {
    setError(null);
    return request;
  });
  const resInterceptor = response.use(response => response, errorReq => {
    setError(errorReq);
  });

  useEffect(() => {
    return () => {
      request.eject(reqInterceptor);
      response.eject(resInterceptor);
    }
    // eslint-disable-next-line
   } , [reqInterceptor, resInterceptor]);

  const errorConfirmHandler = () => {
    setError(null);
  }
  return [error, errorConfirmHandler];
  
}