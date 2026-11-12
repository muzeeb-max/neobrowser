const entries = [
  { title: 'Quick Sort', statement: 'Sort an integer array in ascending order using the divide-and-conquer quick sort algorithm.', tags: ['sorting','divide and conquer'], code: `import java.util.*;
public class Main {
    static void quickSort(int[] a, int low, int high) {
        if (low >= high) return;
        int pivot = a[low + (high - low) / 2], i = low, j = high;
        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;
            if (i <= j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; }
        }
        if (low < j) quickSort(a, low, j);
        if (i < high) quickSort(a, i, high);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        quickSort(a, 0, n - 1); for (int x : a) System.out.print(x + " ");
    }
}` },
  { title: 'Binary Search', statement: 'Find a target value in a sorted array and print its zero-based index, or -1 if absent.', tags: ['search','array'], code: `import java.util.*;
public class Main {
    static int binarySearch(int[] a, int key) {
        int low = 0, high = a.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] == key) return mid;
            if (a[mid] < key) low = mid + 1; else high = mid - 1;
        }
        return -1;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); int n = sc.nextInt(); int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(binarySearch(a, sc.nextInt()));
    }
}` },
  { title: "Prim's Algorithm", statement: 'Find a minimum spanning tree of a connected, undirected weighted graph using Prim’s algorithm.', tags: ['graph','mst','minimum spanning tree'], code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); int n = sc.nextInt(), m = sc.nextInt();
        int[][] w = new int[n][n]; for (int[] row : w) Arrays.fill(row, Integer.MAX_VALUE);
        for (int i = 0; i < m; i++) { int u = sc.nextInt()-1, v = sc.nextInt()-1, x = sc.nextInt(); w[u][v] = w[v][u] = x; }
        boolean[] used = new boolean[n]; int[] key = new int[n], parent = new int[n];
        Arrays.fill(key, Integer.MAX_VALUE); Arrays.fill(parent, -1); key[0] = 0; long total = 0;
        for (int k = 0; k < n; k++) {
            int u = -1; for (int i = 0; i < n; i++) if (!used[i] && (u < 0 || key[i] < key[u])) u = i;
            if (u < 0 || key[u] == Integer.MAX_VALUE) { System.out.println("Graph is disconnected"); return; }
            used[u] = true; total += key[u];
            for (int v = 0; v < n; v++) if (!used[v] && w[u][v] < key[v]) { key[v] = w[u][v]; parent[v] = u; }
        }
        System.out.println("MST edges:"); for (int v = 1; v < n; v++) System.out.println((parent[v]+1) + " - " + (v+1) + " : " + w[v][parent[v]]);
        System.out.println("Total cost: " + total);
    }
}` },
  { title: 'Kruskal Algorithm', statement: 'Build a minimum spanning tree by selecting the lightest edges that do not form a cycle.', tags: ['graph','mst','minimum spanning tree'], code: `import java.util.*;
public class Main {
    static class Edge implements Comparable<Edge> { int u,v,w; Edge(int a,int b,int c){u=a;v=b;w=c;} public int compareTo(Edge e){return Integer.compare(w,e.w);} }
    static int find(int[] p,int x){return p[x]==x?x:(p[x]=find(p,p[x]));}
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in); int n=sc.nextInt(),m=sc.nextInt(); Edge[] e=new Edge[m];
        for(int i=0;i<m;i++) e[i]=new Edge(sc.nextInt()-1,sc.nextInt()-1,sc.nextInt()); Arrays.sort(e);
        int[] p=new int[n]; for(int i=0;i<n;i++)p[i]=i; long cost=0; int count=0;
        for(Edge x:e){int a=find(p,x.u),b=find(p,x.v); if(a!=b){p[a]=b;cost+=x.w;count++;System.out.println((x.u+1)+" - "+(x.v+1)+" : "+x.w);}}
        if(count!=n-1)System.out.println("Graph is disconnected"); else System.out.println("Total cost: "+cost);
    }
}` },
  { title: 'Dijkstra', statement: 'Compute shortest distances from a source vertex in a graph with non-negative edge weights.', tags: ['graph','shortest path'], code: `import java.util.*;
public class Main {
    static class Edge { int to,w; Edge(int t,int x){to=t;w=x;} }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in); int n=sc.nextInt(),m=sc.nextInt(); List<Edge>[] g=new ArrayList[n]; for(int i=0;i<n;i++)g[i]=new ArrayList<>();
        for(int i=0;i<m;i++){int u=sc.nextInt()-1,v=sc.nextInt()-1,w=sc.nextInt();g[u].add(new Edge(v,w));g[v].add(new Edge(u,w));}
        int s=sc.nextInt()-1; long[] d=new long[n]; Arrays.fill(d,Long.MAX_VALUE); d[s]=0;
        PriorityQueue<long[]> pq=new PriorityQueue<>(Comparator.comparingLong(a->a[1])); pq.add(new long[]{s,0});
        while(!pq.isEmpty()){long[] cur=pq.poll();int u=(int)cur[0];if(cur[1]!=d[u])continue;for(Edge e:g[u])if(d[u]+e.w<d[e.to]){d[e.to]=d[u]+e.w;pq.add(new long[]{e.to,d[e.to]});}}
        for(int i=0;i<n;i++)System.out.println((i+1)+": "+(d[i]==Long.MAX_VALUE?"INF":d[i]));
    }
}` },
  { title: 'Floyd Warshall', statement: 'Find shortest paths between every pair of vertices; the input may contain negative edges but no negative cycle.', tags: ['graph','all pairs shortest path'], code: `import java.util.*;
public class Main {
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt(),m=sc.nextInt();long inf=Long.MAX_VALUE/4;long[][] d=new long[n][n];for(int i=0;i<n;i++){Arrays.fill(d[i],inf);d[i][i]=0;}
        for(int i=0;i<m;i++){int u=sc.nextInt()-1,v=sc.nextInt()-1,w=sc.nextInt();d[u][v]=Math.min(d[u][v],w);}
        for(int k=0;k<n;k++)for(int i=0;i<n;i++)for(int j=0;j<n;j++)if(d[i][k]<inf&&d[k][j]<inf)d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);
        for(int i=0;i<n;i++){for(int j=0;j<n;j++)System.out.print((d[i][j]>=inf?"INF":d[i][j])+" ");System.out.println();}
        for(int i=0;i<n;i++)if(d[i][i]<0){System.out.println("Negative cycle detected");break;}
    }
}` },
  { title: 'Longest Common Subsequence', statement: 'Compute the length and one longest common subsequence of two input strings.', tags: ['dynamic programming','string'], code: `import java.util.*;
public class Main {
    public static void main(String[] args){Scanner sc=new Scanner(System.in);String a=sc.nextLine(),b=sc.nextLine();int n=a.length(),m=b.length();int[][] dp=new int[n+1][m+1];
        for(int i=1;i<=n;i++)for(int j=1;j<=m;j++)dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
        StringBuilder s=new StringBuilder();int i=n,j=m;while(i>0&&j>0){if(a.charAt(i-1)==b.charAt(j-1)){s.append(a.charAt(i-1));i--;j--;}else if(dp[i-1][j]>=dp[i][j-1])i--;else j--;}
        System.out.println("Length: "+dp[n][m]);System.out.println("LCS: "+s.reverse());
    }
}` },
  { title: 'Matrix Chain Multiplication', statement: 'Choose matrix multiplication order to minimize scalar multiplications for the given dimension sequence.', tags: ['dynamic programming','matrix'], code: `import java.util.*;
public class Main {
    static void print(int i,int j,int[][] split){if(i==j){System.out.print("A"+i);return;}System.out.print("(");print(i,split[i][j],split);print(split[i][j]+1,j,split);System.out.print(")");}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt();long[] p=new long[n+1];for(int i=0;i<=n;i++)p[i]=sc.nextLong();long[][] dp=new long[n+1][n+1];int[][] s=new int[n+1][n+1];
        for(int len=2;len<=n;len++)for(int i=1;i+len-1<=n;i++){int j=i+len-1;dp[i][j]=Long.MAX_VALUE;for(int k=i;k<j;k++){long x=dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j];if(x<dp[i][j]){dp[i][j]=x;s[i][j]=k;}}}
        System.out.println("Minimum multiplications: "+dp[1][n]);System.out.print("Order: ");print(1,n,s);System.out.println();
    }
}` },
  { title: 'Optimal BST', statement: 'Construct an optimal binary search tree for sorted keys and their successful-search frequencies.', tags: ['dynamic programming','tree','bst'], code: `import java.util.*;
public class Main {
    static void show(int i,int j,int[][] root,String[] key){if(i>j)return;int r=root[i][j];System.out.println(key[r-1]+" is root of keys "+i+".."+j);show(i,r-1,root,key);show(r+1,j,root,key);}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt();String[] key=new String[n+1];long[] f=new long[n+1];for(int i=1;i<=n;i++)key[i]=sc.next();for(int i=1;i<=n;i++)f[i]=sc.nextLong();long[][] dp=new long[n+2][n+2];int[][] root=new int[n+2][n+2];
        for(int len=1;len<=n;len++)for(int i=1;i+len-1<=n;i++){int j=i+len-1;long sum=0;for(int k=i;k<=j;k++)sum+=f[k];dp[i][j]=Long.MAX_VALUE;for(int r=i;r<=j;r++){long x=(r>i?dp[i][r-1]:0)+(r<j?dp[r+1][j]:0)+sum;if(x<dp[i][j]){dp[i][j]=x;root[i][j]=r;}}}
        System.out.println("Minimum search cost: "+dp[1][n]);show(1,n,root,key);
    }
}` },
  { title: 'Optimal BST Encoding/Decoding', statement: 'Build an optimal search tree from key frequencies, then encode and decode a key as its left/right path.', tags: ['dynamic programming','tree','encoding','decoding'], code: `import java.util.*;
public class Main {
    static class Node {String key;Node left,right;Node(String k){key=k;}}
    static Node build(int i,int j,int[][] root,String[] keys){if(i>j)return null;Node x=new Node(keys[root[i][j]-1]);x.left=build(i,root[i][j]-1,root,keys);x.right=build(root[i][j]+1,j,root,keys);return x;}
    static String encode(Node n,String key,String path){if(n==null)return null;if(n.key.equals(key))return path;String s=encode(n.left,key,path+"0");return s!=null?s:encode(n.right,key,path+"1");}
    static String decode(Node n,String bits){for(char c:bits.toCharArray()){if(n==null)return "Invalid code";n=c=='0'?n.left:n.right;}return n==null?"Invalid code":n.key;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt();String[] keys=new String[n];long[] f=new long[n];for(int i=0;i<n;i++)keys[i]=sc.next();for(int i=0;i<n;i++)f[i]=sc.nextLong();long[][] dp=new long[n+2][n+2];int[][] root=new int[n+2][n+2];
        for(int len=1;len<=n;len++)for(int i=1;i+len-1<=n;i++){int j=i+len-1;long sum=0;for(int k=i;k<=j;k++)sum+=f[k-1];dp[i][j]=Long.MAX_VALUE;for(int r=i;r<=j;r++){long x=(r>i?dp[i][r-1]:0)+(r<j?dp[r+1][j]:0)+sum;if(x<dp[i][j]){dp[i][j]=x;root[i][j]=r;}}}
        Node tree=build(1,n,root,keys);String key=sc.next();String bits=encode(tree,key,"");System.out.println("Code: "+(bits==null?"Key not found":bits));if(bits!=null)System.out.println("Decoded: "+decode(tree,bits));
    }
}` },
  { title: 'Travelling Salesman Problem (Minimum Cost)', statement: 'Find the minimum-cost Hamiltonian cycle for a complete weighted graph using bitmask dynamic programming.', tags: ['graph','dynamic programming','tsp','minimum'], code: `import java.util.*;
public class Main {
    static int n;static long[][] w,dp;static int[][] next;
    static long solve(int mask,int u){if(mask==(1<<n)-1)return w[u][0];if(dp[mask][u]!=-1)return dp[mask][u];long best=Long.MAX_VALUE/4;for(int v=0;v<n;v++)if((mask&(1<<v))==0){long x=w[u][v]+solve(mask|1<<v,v);if(x<best){best=x;next[mask][u]=v;}}return dp[mask][u]=best;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);n=sc.nextInt();w=new long[n][n];for(int i=0;i<n;i++)for(int j=0;j<n;j++)w[i][j]=sc.nextLong();dp=new long[1<<n][n];for(long[] r:dp)Arrays.fill(r,-1);next=new int[1<<n][n];System.out.println("Minimum cost: "+solve(1,0));int mask=1,u=0;System.out.print("Tour: 1");while(mask!=(1<<n)-1){u=next[mask][u];mask|=1<<u;System.out.print(" -> "+(u+1));}System.out.println(" -> 1");}
}` },
  { title: 'Travelling Salesman Problem (Maximum Cost)', statement: 'Find the maximum-cost Hamiltonian cycle for a complete weighted graph using bitmask dynamic programming.', tags: ['graph','dynamic programming','tsp','maximum'], code: `import java.util.*;
public class Main {
    static int n;static long[][] w,dp;static int[][] next;
    static long solve(int mask,int u){if(mask==(1<<n)-1)return w[u][0];if(dp[mask][u]!=Long.MIN_VALUE)return dp[mask][u];long best=Long.MIN_VALUE/4;for(int v=0;v<n;v++)if((mask&(1<<v))==0){long x=w[u][v]+solve(mask|1<<v,v);if(x>best){best=x;next[mask][u]=v;}}return dp[mask][u]=best;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);n=sc.nextInt();w=new long[n][n];for(int i=0;i<n;i++)for(int j=0;j<n;j++)w[i][j]=sc.nextLong();dp=new long[1<<n][n];for(long[] r:dp)Arrays.fill(r,Long.MIN_VALUE);next=new int[1<<n][n];System.out.println("Maximum cost: "+solve(1,0));int mask=1,u=0;System.out.print("Tour: 1");while(mask!=(1<<n)-1){u=next[mask][u];mask|=1<<u;System.out.print(" -> "+(u+1));}System.out.println(" -> 1");}
}` },
  { title: 'Maximum Flow', statement: 'Compute the maximum flow from a source to a sink using the Edmonds–Karp augmenting-path algorithm.', tags: ['graph','flow','network'], code: `import java.util.*;
public class Main {
    static long bfs(long[][] r,int s,int t,int[] parent){Arrays.fill(parent,-1);parent[s]=s;Queue<Integer> q=new ArrayDeque<>();q.add(s);while(!q.isEmpty()){int u=q.poll();for(int v=0;v<r.length;v++)if(parent[v]==-1&&r[u][v]>0){parent[v]=u;if(v==t){long f=Long.MAX_VALUE;for(int x=t;x!=s;x=parent[x])f=Math.min(f,r[parent[x]][x]);return f;}q.add(v);}}return 0;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt(),m=sc.nextInt();long[][] r=new long[n][n];for(int i=0;i<m;i++){int u=sc.nextInt()-1,v=sc.nextInt()-1;long c=sc.nextLong();r[u][v]+=c;}int s=sc.nextInt()-1,t=sc.nextInt()-1;int[] p=new int[n];long flow=0,f;while((f=bfs(r,s,t,p))>0){flow+=f;for(int v=t;v!=s;v=p[v]){int u=p[v];r[u][v]-=f;r[v][u]+=f;}}System.out.println("Maximum flow: "+flow);}
}` },
  { title: 'Bipartite Matching', statement: 'Find a maximum matching in a bipartite graph given as edges from left-side vertices to right-side vertices.', tags: ['graph','matching','bipartite'], code: `import java.util.*;
public class Main {
    static List<Integer>[] g;static int[] match;static boolean[] seen;
    static boolean augment(int u){for(int v:g[u])if(!seen[v]){seen[v]=true;if(match[v]==-1||augment(match[v])){match[v]=u;return true;}}return false;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int l=sc.nextInt(),r=sc.nextInt(),m=sc.nextInt();g=new ArrayList[l];for(int i=0;i<l;i++)g[i]=new ArrayList<>();for(int i=0;i<m;i++)g[sc.nextInt()-1].add(sc.nextInt()-1);match=new int[r];Arrays.fill(match,-1);int count=0;for(int u=0;u<l;u++){seen=new boolean[r];if(augment(u))count++;}System.out.println("Matching size: "+count);for(int v=0;v<r;v++)if(match[v]!=-1)System.out.println((match[v]+1)+" - "+(v+1));}
}` },
  { title: '8 Queens', statement: 'Place eight queens on an 8×8 chessboard so that no two queens attack each other, and print a solution.', tags: ['backtracking','queen','chess'], code: `public class Main {
    static final int N=8;static int[] col=new int[N];
    static boolean place(int row){if(row==N)return true;for(int c=0;c<N;c++){boolean ok=true;for(int r=0;r<row;r++)if(col[r]==c||Math.abs(col[r]-c)==row-r){ok=false;break;}if(ok){col[row]=c;if(place(row+1))return true;}}return false;}
    public static void main(String[] args){if(place(0))for(int r=0;r<N;r++){for(int c=0;c<N;c++)System.out.print(col[r]==c?"Q ":". ");System.out.println();}}
}` },
  { title: 'Combination Sum II', statement: 'Find unique combinations that sum to a target; each candidate may be used once and duplicates are removed.', tags: ['backtracking','combination','array'], code: `import java.util.*;
public class Main {
    static void search(int[] a,int start,int remain,List<Integer> path,List<List<Integer>> out){if(remain==0){out.add(new ArrayList<>(path));return;}for(int i=start;i<a.length;i++){if(i>start&&a[i]==a[i-1])continue;if(a[i]>remain)break;path.add(a[i]);search(a,i+1,remain-a[i],path,out);path.remove(path.size()-1);}}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] a=new int[n];for(int i=0;i<n;i++)a[i]=sc.nextInt();int target=sc.nextInt();Arrays.sort(a);List<List<Integer>> out=new ArrayList<>();search(a,0,target,new ArrayList<>(),out);for(List<Integer> x:out)System.out.println(x);}
}` },
  { title: 'Graph Coloring', statement: 'Color an undirected graph with at most m colors so adjacent vertices receive different colors.', tags: ['graph','backtracking','coloring'], code: `import java.util.*;
public class Main {
    static boolean safe(int v,int c,int[][] g,int[] color){for(int u=0;u<g.length;u++)if(g[v][u]!=0&&color[u]==c)return false;return true;}
    static boolean solve(int v,int m,int[][] g,int[] color){if(v==g.length)return true;for(int c=1;c<=m;c++)if(safe(v,c,g,color)){color[v]=c;if(solve(v+1,m,g,color))return true;color[v]=0;}return false;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt(),e=sc.nextInt(),m=sc.nextInt();int[][] g=new int[n][n];for(int i=0;i<e;i++){int u=sc.nextInt()-1,v=sc.nextInt()-1;g[u][v]=g[v][u]=1;}int[] color=new int[n];if(solve(0,m,g,color))for(int i=0;i<n;i++)System.out.println("Vertex "+(i+1)+": color "+color[i]);else System.out.println("No coloring possible");}
}` },
  { title: 'Graph Coloring (Conflict Free)', statement: 'Find a minimum coloring and print color classes, ensuring each class contains no adjacent vertices.', tags: ['graph','coloring','conflict free'], code: `import java.util.*;
public class Main {
    static int n,best;static int[][] g;static int[] color,bestColor;
    static void solve(int v,int used){if(used>=best)return;if(v==n){best=used;bestColor=color.clone();return;}for(int c=1;c<=used+1;c++){boolean ok=true;for(int u=0;u<v;u++)if(g[v][u]!=0&&color[u]==c){ok=false;break;}if(ok){color[v]=c;solve(v+1,Math.max(used,c));color[v]=0;}}}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);n=sc.nextInt();int e=sc.nextInt();g=new int[n][n];for(int i=0;i<e;i++){int u=sc.nextInt()-1,v=sc.nextInt()-1;g[u][v]=g[v][u]=1;}best=n+1;color=new int[n];bestColor=new int[n];solve(0,0);System.out.println("Minimum colors: "+best);for(int c=1;c<=best;c++){System.out.print("Color "+c+": ");for(int v=0;v<n;v++)if(bestColor[v]==c)System.out.print((v+1)+" ");System.out.println();}}
}` },
  { title: '15 Puzzle', statement: 'Solve a 4×4 sliding puzzle with tiles 1–15 and blank 0 using A* with Manhattan distance.', tags: ['search','a star','puzzle','15 puzzle'], code: `import java.util.*;
public class Main {
    static final int N=4;static String key(int[] a){return Arrays.toString(a);}static int h(int[] a){int x=0;for(int i=0;i<16;i++)if(a[i]!=0){int v=a[i]-1;x+=Math.abs(i/4-v/4)+Math.abs(i%4-v%4);}return x;}
    static class State{int[] a;int zero,g,h;State(int[] x,int z,int cost){a=x;zero=z;g=cost;h=Main.h(x);} }
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int[] start=new int[16];int z=0,inv=0;for(int i=0;i<16;i++){start[i]=sc.nextInt();if(start[i]==0)z=i;}for(int i=0;i<16;i++)if(start[i]!=0)for(int j=i+1;j<16;j++)if(start[j]!=0&&start[i]>start[j])inv++;int rowFromBottom=4-z/4;if((inv+rowFromBottom)%2==0){System.out.println("No solution");return;}
        PriorityQueue<State> pq=new PriorityQueue<>(Comparator.comparingInt(s->s.g+s.h));Map<String,Integer> dist=new HashMap<>();Map<String,String> prev=new HashMap<>();Map<String,Character> move=new HashMap<>();State first=new State(start,z,0);pq.add(first);dist.put(key(start),0);int[] dz={-4,4,0,0};char[] dirs={'U','D','L','R'};String goal=null;
        while(!pq.isEmpty()){State s=pq.poll();String k=key(s.a);if(s.g!=dist.get(k))continue;if(s.h==0){goal=k;break;}for(int d=0;d<4;d++){int p=s.zero+dz[d];if(d==2&&s.zero%4==0||d==3&&s.zero%4==3||p<0||p>=16)continue;int[] b=s.a.clone();b[s.zero]=b[p];b[p]=0;String nk=key(b);if(s.g+1<dist.getOrDefault(nk,Integer.MAX_VALUE)){dist.put(nk,s.g+1);prev.put(nk,k);move.put(nk,dirs[d]);pq.add(new State(b,p,s.g+1));}}}
        if(goal==null){System.out.println("No solution");return;}StringBuilder path=new StringBuilder();while(prev.containsKey(goal)){path.append(move.get(goal));goal=prev.get(goal);}System.out.println("Moves: "+path.reverse().length());System.out.println("Path: "+path);
    }
}` },
  { title: 'Job Assignment', statement: 'Assign each worker one job at minimum total cost using bitmask dynamic programming.', tags: ['dynamic programming','assignment','jobs'], code: `import java.util.*;
public class Main {
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt();long[][] cost=new long[n][n];for(int i=0;i<n;i++)for(int j=0;j<n;j++)cost[i][j]=sc.nextLong();long[] dp=new long[1<<n];Arrays.fill(dp,Long.MAX_VALUE/4);dp[0]=0;int[] parent=new int[1<<n],job=new int[1<<n];Arrays.fill(parent,-1);
        for(int mask=0;mask<(1<<n);mask++){int worker=Integer.bitCount(mask);if(worker==n)continue;for(int j=0;j<n;j++)if((mask&(1<<j))==0){int next=mask|1<<j;long x=dp[mask]+cost[worker][j];if(x<dp[next]){dp[next]=x;parent[next]=mask;job[next]=j;}}}
        System.out.println("Minimum cost: "+dp[(1<<n)-1]);int mask=(1<<n)-1;int[] assigned=new int[n];for(int w=n-1;w>=0;w--){assigned[w]=job[mask];mask=parent[mask];}for(int w=0;w<n;w++)System.out.println("Worker "+(w+1)+" -> Job "+(assigned[w]+1));
    }
}` },
  { title: 'Knapsack', statement: 'Choose items to maximize total value without exceeding capacity using 0/1 dynamic programming.', tags: ['dynamic programming','optimization'], code: `import java.util.*;
public class Main {
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt(),cap=sc.nextInt();int[] wt=new int[n],val=new int[n];for(int i=0;i<n;i++){wt[i]=sc.nextInt();val[i]=sc.nextInt();}long[][] dp=new long[n+1][cap+1];for(int i=1;i<=n;i++)for(int c=0;c<=cap;c++){dp[i][c]=dp[i-1][c];if(wt[i-1]<=c)dp[i][c]=Math.max(dp[i][c],dp[i-1][c-wt[i-1]]+val[i-1]);}
        System.out.println("Maximum value: "+dp[n][cap]);List<Integer> chosen=new ArrayList<>();int c=cap;for(int i=n;i>0;i--)if(dp[i][c]!=dp[i-1][c]){chosen.add(i);c-=wt[i-1];}Collections.reverse(chosen);System.out.println("Items (1-based): "+chosen);
    }
}` },
  { title: 'Room Assignment', statement: 'Assign each event to a compatible room at minimum cost; each room is used at most once.', tags: ['assignment','rooms','dynamic programming'], code: `import java.util.*;
public class Main {
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int events=sc.nextInt(),rooms=sc.nextInt();long[][] cost=new long[events][rooms];for(int i=0;i<events;i++)for(int j=0;j<rooms;j++)cost[i][j]=sc.nextLong();if(events>rooms){System.out.println("Not enough rooms");return;}long inf=Long.MAX_VALUE/4;long[] dp=new long[1<<rooms];Arrays.fill(dp,inf);dp[0]=0;int[] prev=new int[1<<rooms],picked=new int[1<<rooms];Arrays.fill(prev,-1);
        for(int mask=0;mask<(1<<rooms);mask++){int e=Integer.bitCount(mask);if(e>=events||dp[mask]==inf)continue;for(int r=0;r<rooms;r++)if((mask&(1<<r))==0){int nm=mask|1<<r;long x=dp[mask]+cost[e][r];if(x<dp[nm]){dp[nm]=x;prev[nm]=mask;picked[nm]=r;}}}
        int best=-1;for(int mask=0;mask<(1<<rooms);mask++)if(Integer.bitCount(mask)==events&&(best<0||dp[mask]<dp[best]))best=mask;System.out.println("Minimum cost: "+dp[best]);int[] assign=new int[events];int mask=best;for(int e=events-1;e>=0;e--){assign[e]=picked[mask];mask=prev[mask];}for(int e=0;e<events;e++)System.out.println("Event "+(e+1)+" -> Room "+(assign[e]+1));
    }
}` },
  { title: 'Repair Scheduling', statement: 'Schedule jobs on one repair machine to minimize the sum of completion times; shorter jobs first is optimal.', tags: ['greedy','scheduling','repair'], code: `import java.util.*;
public class Main {
    static class Job{int id;long time;Job(int i,long t){id=i;time=t;}}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);int n=sc.nextInt();Job[] jobs=new Job[n];for(int i=0;i<n;i++)jobs[i]=new Job(i+1,sc.nextLong());Arrays.sort(jobs,Comparator.comparingLong((Job j)->j.time).thenComparingInt(j->j.id));long time=0,sum=0;System.out.println("Repair order:");for(Job j:jobs){time+=j.time;sum+=time;System.out.println("Job "+j.id+" (duration "+j.time+") completes at "+time);}System.out.println("Sum of completion times: "+sum);}
}` },
  { title: 'Directed TSP', statement: 'Find the minimum Hamiltonian cycle in a directed weighted graph, starting and ending at vertex 1.', tags: ['graph','dynamic programming','tsp','directed'], code: `import java.util.*;
public class Main {
    static int n;static long[][] w,dp;static int[][] choice;static long INF=Long.MAX_VALUE/4;
    static long solve(int mask,int u){if(mask==(1<<n)-1)return w[u][0]>=INF?INF:w[u][0];if(dp[mask][u]!=-1)return dp[mask][u];long best=INF;for(int v=0;v<n;v++)if((mask&(1<<v))==0&&w[u][v]<INF){long tail=solve(mask|1<<v,v);if(tail<INF&&w[u][v]+tail<best){best=w[u][v]+tail;choice[mask][u]=v;}}return dp[mask][u]=best;}
    public static void main(String[] args){Scanner sc=new Scanner(System.in);n=sc.nextInt();int m=sc.nextInt();w=new long[n][n];for(long[] row:w)Arrays.fill(row,INF);for(int i=0;i<m;i++){int u=sc.nextInt()-1,v=sc.nextInt()-1;long c=sc.nextLong();w[u][v]=Math.min(w[u][v],c);}dp=new long[1<<n][n];for(long[] row:dp)Arrays.fill(row,-1);choice=new int[1<<n][n];long ans=solve(1,0);if(ans>=INF){System.out.println("No Hamiltonian cycle");return;}System.out.println("Minimum cost: "+ans);int mask=1,u=0;System.out.print("Tour: 1");while(mask!=(1<<n)-1){u=choice[mask][u];mask|=1<<u;System.out.print(" -> "+(u+1));}System.out.println(" -> 1");}
}` },
]

// Normalize compact snippets too, keeping semicolons inside for-loop headers intact.
function formatJava(source) {
  let out = '', indent = 0, parens = 0, quote = '', escaped = false, lineStart = true
  const write = (value) => {
    if (lineStart && value.trim()) { out += '    '.repeat(Math.max(0, indent)); lineStart = false }
    out += value
  }
  const newline = () => {
    out = out.replace(/[ \t]+$/, '')
    if (!out.endsWith('\n')) out += '\n'
    lineStart = true
  }
  for (let i = 0; i < source.length; i++) {
    const ch = source[i]
    if (quote) {
      write(ch)
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === quote) quote = ''
      continue
    }
    if (ch === '"' || ch === "'") { quote = ch; write(ch); continue }
    if (ch === '(') parens++
    if (ch === ')') parens--
    if (ch === '{') { write('{'); indent++; newline(); continue }
    if (ch === '}') { if (!lineStart) newline(); indent--; write('}'); newline(); continue }
    if (ch === ';' && parens === 0) { write(';'); newline(); continue }
    if (ch === '\n' || ch === '\r') { if (!lineStart) newline(); continue }
    if (lineStart && /\s/.test(ch)) continue
    write(ch)
  }
  return out.trim()
}

export const questions = entries.map((item, index) => ({ ...item, code: formatJava(item.code), id: index + 1, fileName: `Q${index + 1}.java` }))
