import React from 'react'

function Rating({value}) {
    return (
        <div className='rating'>
          <span>
              <i className={
                  value >= 1 ? 'fa-solid fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'fa-regular fa-star'
              }>
              </i>
          </span>
            <span>
              <i className={
                  value >= 2
                      ? 'fa-solid fa-star'
                      : value >= 1.5
                          ? 'fas fa-star-half-alt'
                          : 'fa-regular fa-star'
              }>
              </i>
          </span>
            <span>
              <i className={
                  value >= 3
                      ? 'fa-solid fa-star'
                      : value >= 2.5
                          ? 'fas fa-star-half-alt'
                          : 'fa-regular fa-star'
              }>
              </i>
          </span>
            <span>
              <i className={
                  value >= 4
                      ? 'fa-solid fa-star'
                      : value >= 3.5
                          ? 'fas fa-star-half-alt'
                          : 'fa-regular fa-star'
              }>
              </i>
          </span>
            <span>
              <i className={
                  value >= 5
                      ? 'fa-solid fa-star'
                      : value >= 4.5
                          ? 'fas fa-star-half-alt'
                          : 'fa-regular fa-star'
              }>
              </i>
          </span>
        </div>
    )
}

export default Rating