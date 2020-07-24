        1  2  3  4  5

row_1 |**|**|**|**|**|
row_2 |**|**|**|**|**|
row_3 |**|**|**|**|**|
row_4 |**|**|**|**|**|
row_5 |**|**|**|**|\_\_|

1. For row[0][0] First cell on the first row and column

North = [row.length - 1][0] // last row first column
West = [0][column.length - 1] // First row last column
North West = [row.length - 1][column.length - 1] []// Last row last column
South West = [0 + 1][column.length - 1] // Second Row last Column
North East = [row.length - 1][0 + 1]

2. For row [0][column.length - 1] the last cell on the the first row

North = [row.length - 1][column.length - 1] // the last row cell at the last column
North West = [row.length - 1][column.length - 2]// Last row , second to the last column
North East = [row.length - 1][0] // Last row first column
East = [0][0] First row first Column
South East = [0 + 1][0] // row i + 1

3. For row[row.length - 1][0] = Last Row first column cell

South = [0][0] // First cell in the first row
South East = [0][1] // second Cell in the First Row.
South West = [0][column.length - 1] // Last Cell in the First row
West = [row.length - 1][column.length - 1] // Last cell on the last row
North West = [row.length -2][colunm.length - 1] // Last cell in the Second to the last Row

4. For row[row.length - 1][ column.length - 1] Last row last column

North East = [row.length - 2][0] //The First Cell in the Second second to last row
East = [row.length - 1][0] // Last Row, First cell
South East = [0][0] // First Row first Column
South West = [0][colomn.length - 2] // First row second to the last cell
South = [0][column.length - 1] // For row, last cell
