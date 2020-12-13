/**
* The Class Snail provides the necessary methods to solve the problem !
*/
class Snail{
	// A method to create A matrix (array of arrays)
	static createMatrix(n) {
		const taille = parseInt(n);
		let matrix = [];
		for(let l=0; l<=taille; l++) {
			matrix[l]=[]
			for (let c = 0; c <= taille; c++) {
				matrix[l][c]=0 // initial value
			}
		}
	return matrix;
}
	/*  This method to perform one turn given the following params :
	** 	sIndex: The index to start with.
	**	LIndex: The last index, the index to end with
	**	n: The size of the spiral
	**	k:  A variable used as the initial value to fill the spiral
	**	M: The Matrix 
	*/ 
	static renderHelper(sIndex,LIndex,n,k,M) {
		if (n==0) { return { lastValue: 0, final: true} }
		else if (n==1) {
			M[sIndex][sIndex]=k+1;
		  	return { lastValue: 0, final: true}
		}
		else {
			let c=0;
			for (let i=sIndex; i <= LIndex; i++) {
				  c++;
			      M[sIndex][i]=c+k // first line
			      M[i][LIndex]=n+c-1+k // last colonne
			      M[LIndex][i]=3*n-2+1-c+k // last ligne
			      if(i==sIndex){ // first colone
			        M[i][sIndex]=1+k
			      }
			      else{
			        M[i][sIndex]=4*(n-1)-c+2+k
			      }
		    }
		    if(n!=2){
		    	 return { lastValue: 4*(n-1)+k, final: false}
		    }
		    else {
		    	return { lastValue: 0, final: true}
		    }
		  }
}
	/**
	** The method performs multiple turns using the renderHelper method.
	**/
	static render(n) {
		let sIndex=1;
		let value=0;
		let LIndex=n;
		let Matrix = Snail.createMatrix(n);
		let { lastValue, final } = Snail.renderHelper(sIndex,LIndex,n,value,Matrix);
		while(final == false){
			n = n-2;
			sIndex = sIndex +1;
			LIndex = LIndex -1;
			value=lastValue;
			({ lastValue, final } = Snail.renderHelper(sIndex,LIndex,n,value,Matrix));
		}
		return Matrix;
	}
}

/**
* functions used in the index.html file
*/
function handleClick() {
	restart()
	param = document.getElementById('input_id').value;
	n = parseInt(param);
	if (isNaN(n) || n < 0) {
		alert("You should insert a valid value for n : integer and positive");
		return;
	}
	
	const res = Snail.render(n);
	// generate Table
	let tableE = document.createElement('TABLE');
	for (let i = 1; i < res.length; i++) {
		let tr = document.createElement('TR');
		for (let j = 1; j < res.length; j++) {
			let td = document.createElement("TD");
			// console.log(res[i][j]);
			td.append(res[i][j]);
			tr.appendChild(td);
		}
		tableE.appendChild(tr);
		tableE.classList.add("table"); // add class bootstrap
		tableE.classList.add("table-bordered") // class bootstrap
	}
	document.getElementById('render').appendChild(tableE);
}
function restart () {
	document.getElementById('render').innerHTML='';
}
