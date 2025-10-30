import { use } from 'react';

import { Opinion } from './Opinion';
import { OpinionsContext } from '../store/opinions-context';

export function Opinions() {
  const { opinions,sortedOpinions } = use(OpinionsContext);
  const content = sortedOpinions? sortedOpinions : opinions;
  
  return (
    <div id="opinions">
      <h2>User Opinions</h2>
      {opinions ? 
        <ul>
          {content.length!==0? content.map((o) => (
            <li key={o._id}>
              <Opinion opinion={o} showshowProfileView={false}/>
            </li>
          )) : <p>No matching opinions.</p>}
        </ul>
      : <p>No opinions found. Maybe share your opinion on something?</p>}
      
    </div>
  );
}
