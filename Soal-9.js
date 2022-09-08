function spiral(param1) { 
    const arr = []; 
    let count = 0; 
    for (let i = 0; i < param1; i++) { 
      arr[i] = []; 
      for (let j = 0; j < param1; j++) { 
        arr[i][j] = count++; 
      } 
    } 
   
    let x = 0
    let y = 0; 
    let batasAtas = param1; 
    let batasBawah = 0; 
   
    let result = []; 
   
    while (result.length < param1 * param1) { 
      // ke kanan 
      for (; x < batasAtas; x++) { 
        result.push(arr[y][x]); 
      } 
      x--; 
      y++; 
      // ke bawah 
      for (; y < batasAtas; y++) { 
        result.push(arr[y][x]); 
      } 
      y--; 
      x--; 
      // ke kiri 
      for (; x >= batasBawah; x--) { 
        result.push(arr[y][x]); 
      } 
      x++; 
      y--; 
      // ke atas 
      for (; y > batasBawah; y--) { 
        result.push(arr[y][x]); 
      } 
      x++; 
      y++; 
      batasBawah++; 
      batasAtas--; 
    } 
    console.log(result); 
  } 
   
  spiral(5); 
  spiral(6); 
  spiral(7);